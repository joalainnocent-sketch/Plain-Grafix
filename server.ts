import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint for deployment probes (Cloud Run, Kubernetes, Docker)
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Lazy initialize Google GenAI SDK
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not configured in the server environment.');
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // Extract clean error message and HTTP status from Gemini SDK errors
  function parseGeminiError(err: unknown): { status: number; message: string } {
    let status = 500;
    let rawMessage = err instanceof Error ? err.message : 'Internal Server Error';

    if (typeof err === 'object' && err !== null && 'status' in err) {
      const maybeStatus = Number((err as { status?: unknown }).status);
      if (maybeStatus >= 400 && maybeStatus < 600) {
        status = maybeStatus;
      }
    }

    // Parse serialized JSON error payloads often returned in err.message
    try {
      const jsonStart = rawMessage.indexOf('{');
      if (jsonStart !== -1) {
        const parsed = JSON.parse(rawMessage.slice(jsonStart));
        const nested = parsed?.error ?? parsed;
        if (typeof nested?.code === 'number' && nested.code >= 400 && nested.code < 600) {
          status = nested.code;
        }
        if (typeof nested?.message === 'string' && nested.message.trim()) {
          rawMessage = nested.message.trim();
        }
      }
    } catch {
      // Fallback to rawMessage if not JSON
    }

    const lower = rawMessage.toLowerCase();
    if (status === 429 || lower.includes('resource_exhausted') || lower.includes('quota')) {
      return {
        status: 429,
        message:
          'AI quota or rate limit was reached. Please wait a moment and try again, switch to Fast mode, or verify your API key quota in Settings > Secrets.',
      };
    }

    if (
      status === 401 ||
      status === 403 ||
      lower.includes('api_key_invalid') ||
      lower.includes('permission_denied') ||
      lower.includes('api key')
    ) {
      return {
        status: status === 401 ? 401 : 403,
        message:
          'Gemini API key is missing, invalid, or lacks permissions. Please check GEMINI_API_KEY in Settings > Secrets.',
      };
    }

    if (status === 404 || lower.includes('not_found')) {
      return {
        status: 404,
        message: 'The selected AI model is currently unavailable. Please try another mode.',
      };
    }

    return { status, message: rawMessage };
  }

  // System instruction for the Plain GraFix Design Consultant & Agency Assistant
  const SYSTEM_INSTRUCTION = `You are "Plain AI", the official senior design consultant and strategic assistant for Plain GraFix — an elite creative branding and graphic design studio (Tagline: "Where Ideas Become Powerful Visuals. Design That Speaks. Brands That Stick.").
Your core objectives:
1. Provide actionable, high-impact design advice, branding strategy, typography feedback, visual identity consultation, UI/UX insights, and marketing design tips.
2. Answer questions about Plain GraFix's services:
   - Full Brand Identity & Logo Systems
   - Visual Systems & Print (Billboards, Brochures, Packaging, Editorial)
   - High-End Digital Experience & UI/UX Design
   - Social Media Campaigns & Motion Visuals
3. Studio details to mention when clients ask:
   - WhatsApp / Direct Line: +27 69 702 2221
   - Email: plaingrafix@gmail.com
   - Instagram: @plain_grafix (https://www.instagram.com/plain_grafix?srtk=MXNlenVtMW8wc3piZA==)
   - Official Facebook: https://web.facebook.com/profile.php?id=61576931625644
   - Client track record: 200% client satisfaction, 100+ completed projects.
4. When relevant, you have live Google Search grounding enabled to look up current real-world design trends, font pairings, market research, competitor insights, brand benchmarks, and design technologies.
5. Tone: Confident, sophisticated, concise, warm, articulate, and deeply grounded in design craft. Format responses neatly with clear bullet points or short paragraphs. Avoid generic filler.`;

  // POST /api/chat - Multi-turn conversational endpoint with Search Grounding
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, taskComplexity } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      const ai = getGeminiClient();

      // Model selection using active @google/genai free-tier models:
      // - Fast/speed tasks: 'gemini-3.1-flash-lite'
      // - General tasks with Search Grounding: 'gemini-4-hydrogen'
      // - Complex strategic reasoning: 'gemini-4-hydrogen' with ThinkingLevel.HIGH + Search Grounding
      let selectedModel = 'gemini-4-hydrogen';
      let thinkingLevel: ThinkingLevel | undefined;

      if (taskComplexity === 'fast') {
        selectedModel = 'gemini-3.1-flash-lite';
      } else if (taskComplexity === 'pro') {
        selectedModel = 'gemini-4-hydrogen';
        thinkingLevel = ThinkingLevel.HIGH;
      }

      // Convert message history to GoogleGenAI contents format
      const formattedContents = messages
        .filter((m: { role?: unknown; content?: unknown }) => typeof m?.content === 'string' && m.content.trim())
        .map((m: { role: string; content: string }) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        }));

      if (formattedContents.length === 0) {
        return res.status(400).json({ error: 'At least one non-empty message is required.' });
      }

      const useSearch = selectedModel === 'gemini-4-hydrogen';

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          ...(thinkingLevel ? { thinkingConfig: { thinkingLevel } } : {}),
          ...(useSearch ? { tools: [{ googleSearch: {} }] } : {}),
        },
      });

      const text =
        response.text || 'I apologize, but I could not formulate a response. Please try again.';

      // Extract search grounding metadata if available
      const searchChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const webSources = searchChunks
        .map((chunk: { web?: { uri?: string; title?: string } }) => chunk.web)
        .filter((web): web is { uri: string; title: string } => Boolean(web && web.uri));

      const searchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];

      return res.json({
        reply: text,
        modelUsed: selectedModel,
        sources: webSources,
        searchQueries,
      });
    } catch (err: unknown) {
      console.error('Error in /api/chat:', err);
      const { status, message } = parseGeminiError(err);
      return res.status(status).json({ error: message });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Plain GraFix full-stack app running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
