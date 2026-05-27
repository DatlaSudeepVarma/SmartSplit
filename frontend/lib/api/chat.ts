import { apiRequest } from './client';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type ChatResponse = {
  reply: string;
  usedLlm: boolean;
  contextSummary?: string | null;
};

export function sendChatMessage(message: string, history?: ChatMessage[]) {
  return apiRequest<ChatResponse>('/chat/message', {
    method: 'POST',
    body: JSON.stringify({ message, history }),
  });
}
