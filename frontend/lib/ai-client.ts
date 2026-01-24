/**
 * AI API client for interacting with Claude and OpenAI endpoints.
 */

import { getConfig } from './config';

export interface ChatMessage {
  role: string;
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  provider?: 'openai' | 'claude';
  system_prompt?: string;
  stream?: boolean;
}

export interface ChatResponse {
  response: string;
  provider: string;
}

export interface TemplateRequest {
  template: string;
  variables: Record<string, unknown>;
  provider?: 'openai' | 'claude';
}

export interface AgentRequest {
  input: string;
  agent_type?: 'general' | 'code_analysis' | 'blockchain_analyst' | 'developer_assistant';
  provider?: 'openai' | 'claude';
  chat_history?: Array<Record<string, string>>;
}

export interface AgentResponse {
  output: string;
  intermediate_steps?: unknown[];
}

export interface ProvidersResponse {
  providers: string[];
}

/**
 * AI API client class.
 */
export class AIClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || getConfig().NEXT_PUBLIC_API_URL;
  }

  /**
   * Get available AI providers.
   */
  async getProviders(): Promise<string[]> {
    const response = await fetch(`${this.baseUrl}/api/ai/providers`);
    if (!response.ok) {
      throw new Error(`Failed to get providers: ${response.statusText}`);
    }
    const data: ProvidersResponse = await response.json();
    return data.providers;
  }

  /**
   * Send chat messages to AI model.
   */
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...request,
        provider: request.provider || 'claude',
      }),
    });

    if (!response.ok) {
      throw new Error(`Chat request failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Stream chat messages to AI model.
   */
  async streamChat(
    request: ChatRequest,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/ai/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...request,
        provider: request.provider || 'claude',
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Stream chat request failed: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to get response reader');
    }

    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }
  }

  /**
   * Generate response using a prompt template.
   */
  async generateWithTemplate(request: TemplateRequest): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/api/ai/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...request,
        provider: request.provider || 'claude',
      }),
    });

    if (!response.ok) {
      throw new Error(`Template generation failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Run AI agent with tools and reasoning.
   */
  async runAgent(request: AgentRequest): Promise<AgentResponse> {
    const response = await fetch(`${this.baseUrl}/api/ai/agent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...request,
        agent_type: request.agent_type || 'general',
        provider: request.provider || 'claude',
      }),
    });

    if (!response.ok) {
      throw new Error(`Agent execution failed: ${response.statusText}`);
    }

    return response.json();
  }
}

/**
 * Default AI client instance.
 */
export const aiClient = new AIClient();
