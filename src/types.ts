export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  sources?: Array<{
    uri: string;
    title: string;
  }>;
  searchQueries?: string[];
  modelUsed?: string;
}

export type ChatComplexity = 'fast' | 'general' | 'pro';
