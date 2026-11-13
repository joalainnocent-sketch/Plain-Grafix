import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  Sparkles,
  Search,
  Globe,
  RefreshCw,
  ExternalLink,
  Bot,
  Zap,
  Cpu,
  Layers,
  HelpCircle,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { ChatMessage, ChatComplexity } from '../types';

interface GeminiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProjectBrief?: () => void;
}

const PRESET_PROMPTS = [
  {
    label: 'Brand Identity',
    query: 'What elements are essential for a timeless brand identity in 2026?',
  },
  {
    label: 'Packaging Trends',
    query: 'Search the latest sustainable packaging design trends and best practices.',
  },
  {
    label: 'Studio Services',
    query: 'What design services does Plain GraFix specialize in, and what is your turnaround?',
  },
  {
    label: 'Font Pairings',
    query: 'Suggest 3 high-contrast, modern font pairings for a luxury lifestyle brand.',
  },
];

const getHostname = (uri: string): string => {
  try {
    return new URL(uri).hostname;
  } catch {
    return uri;
  }
};

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  isOpen,
  onClose,
  onOpenProjectBrief,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      content:
        'Hello! I am **Plain AI**, your senior creative strategist from Plain GraFix.\n\nI can analyze branding challenges, suggest typography and visual systems, brainstorm creative campaigns, or search the web in real-time for live design trends.\n\nHow can I elevate your brand today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-4-hydrogen',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [complexity, setComplexity] = useState<ChatComplexity>('general');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          taskComplexity: complexity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || [],
        searchQueries: data.searchQueries || [],
        modelUsed: data.modelUsed,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Unable to reach the design consultant server. Please check your connection.';

      const fallbackMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `**Notice:** ${errorMsg}\n\nYou can also contact the studio directly via [WhatsApp](https://wa.me/27697022221) or email [plaingrafix@gmail.com](mailto:plaingrafix@gmail.com).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome-msg',
        role: 'model',
        content:
          'Conversation reset. I am **Plain AI** with live Google Search grounding. What design challenge or visual direction shall we explore?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-4-hydrogen',
      },
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-end justify-end p-2 sm:p-5 pointer-events-none">
          {/* Backdrop on mobile for clarity */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm sm:hidden pointer-events-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-auto w-full sm:w-[460px] ${
              isExpanded ? 'sm:w-[620px] h-[85vh]' : 'h-[620px] max-h-[90vh]'
            } bg-neutral-950/95 border border-neutral-800 rounded-2xl sm:rounded-3xl shadow-[0_16px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300 relative z-10`}
          >
            {/* Header */}
            <div className="px-4 sm:px-5 py-3.5 border-b border-neutral-800/80 bg-neutral-900/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#ea580c]/15 border border-[#ea580c]/40 flex items-center justify-center text-[#ea580c] shadow-[0_0_12px_rgba(234,88,12,0.3)]">
                  <Bot size={17} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white tracking-tight">Plain AI</span>
                    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#ea580c]/20 text-[#ea580c] border border-[#ea580c]/30">
                      <Sparkles size={9} />
                      Gemini
                    </span>
                    <span className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <Search size={9} />
                      Google Search
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400">Design Consultant & Live Research</p>
                </div>
              </div>

              {/* Header Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  title="Reset Conversation"
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800/60 transition cursor-pointer"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? 'Standard View' : 'Expand View'}
                  className="hidden sm:block p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800/60 transition cursor-pointer"
                >
                  {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button
                  onClick={onClose}
                  title="Close Assistant"
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800/60 transition cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Model & Search Grounding Selector Pill Bar */}
            <div className="px-4 py-2 bg-neutral-950/80 border-b border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                  Mode:
                </span>
                <div className="inline-flex p-0.5 bg-neutral-900 border border-neutral-800 rounded-lg">
                  <button
                    onClick={() => setComplexity('fast')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer flex items-center gap-1 ${
                      complexity === 'fast'
                        ? 'bg-neutral-800 text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Fast responses (Gemini 3.1 Flash Lite)"
                  >
                    <Zap size={10} className="text-amber-400" />
                    Fast
                  </button>
                  <button
                    onClick={() => setComplexity('general')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer flex items-center gap-1 ${
                      complexity === 'general'
                        ? 'bg-[#ea580c] text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="General tasks + Live Google Search (Gemini 4 Hydrogen)"
                  >
                    <Search size={10} />
                    Search
                  </button>
                  <button
                    onClick={() => setComplexity('pro')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer flex items-center gap-1 ${
                      complexity === 'pro'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Deep strategic reasoning + Search (Gemini 4 High Thinking)"
                  >
                    <Cpu size={10} className="text-purple-300" />
                    Pro
                  </button>
                </div>
              </div>

              {complexity !== 'fast' && (
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <Globe size={11} />
                  <span>Grounding Active</span>
                </div>
              )}
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm scrollbar-thin scrollbar-thumb-neutral-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  } group`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed text-sm ${
                      msg.role === 'user'
                        ? 'bg-[#ea580c] text-white rounded-br-xs shadow-md'
                        : 'bg-neutral-900/90 text-neutral-200 border border-neutral-800 rounded-bl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap select-text selection:bg-neutral-700">
                      {msg.content}
                    </div>

                    {/* Google Search Grounding Sources */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-neutral-800/80 text-xs">
                        <div className="flex items-center gap-1.5 text-neutral-400 font-semibold mb-1.5 text-[11px]">
                          <Search size={11} className="text-emerald-400" />
                          <span>Google Search Sources ({msg.sources.length}):</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.sources.slice(0, 4).map((src, idx) => (
                            <a
                              key={idx}
                              href={src.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-[11px] text-neutral-300 hover:text-white transition truncate max-w-[200px]"
                              title={src.title || src.uri}
                            >
                              <ExternalLink size={9} className="shrink-0 text-neutral-400" />
                              <span className="truncate">{src.title || getHostname(src.uri)}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Timestamp & Model badge */}
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-500 px-1">
                    <span>{msg.timestamp}</span>
                    {msg.modelUsed && (
                      <span className="font-mono text-[9px] text-neutral-600">
                        {msg.modelUsed}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-900/70 border border-neutral-800 rounded-2xl px-3.5 py-2.5 w-fit">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#ea580c] rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[#ea580c] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-[#ea580c] rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[11px] font-medium">
                    {complexity === 'pro'
                      ? 'Gemini 4 Pro thinking & searching...'
                      : complexity === 'fast'
                      ? 'Formulating fast response...'
                      : 'Searching Google & consulting studio insights...'}
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Inspiration Chips */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-neutral-800/40 bg-neutral-950/60 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold shrink-0">
                    Try:
                  </span>
                  {PRESET_PROMPTS.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(p.query)}
                      className="px-2.5 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] text-neutral-300 hover:text-white transition whitespace-nowrap cursor-pointer shrink-0"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 sm:p-4 border-t border-neutral-800/80 bg-neutral-900/50">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    complexity === 'pro'
                      ? 'Ask deep branding & strategy question...'
                      : 'Ask anything or search design trends...'
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#ea580c] focus:outline-none rounded-xl pl-3.5 pr-11 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 transition-colors select-text"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className={`absolute right-1.5 p-1.5 rounded-lg transition ${
                    input.trim() && !isLoading
                      ? 'bg-[#ea580c] text-white hover:bg-[#ea580c]/90 cursor-pointer shadow-md'
                      : 'text-neutral-600 bg-transparent cursor-not-allowed'
                  }`}
                  title="Send Message"
                >
                  <Send size={15} />
                </button>
              </div>

              {/* Bottom auxiliary links */}
              <div className="flex items-center justify-between mt-2 pt-1 text-[11px] text-neutral-500">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Powered by Gemini & Google Search</span>
                </div>
                {onOpenProjectBrief && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenProjectBrief();
                    }}
                    className="text-[#ea580c] hover:underline cursor-pointer font-medium"
                  >
                    Start Project Brief →
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
