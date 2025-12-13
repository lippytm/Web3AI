import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '../utils/logger.js';
import type { AgentTask, AgentResponse } from '../types/index.js';

/**
 * Base AI Agent for Web3 operations
 */
export class BaseAgent {
  protected llm: ChatOpenAI;
  protected systemPrompt: string;

  constructor(apiKey: string, model: string = 'gpt-4') {
    this.llm = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName: model,
      temperature: 0.7,
    });
    
    this.systemPrompt = `You are an AI agent specialized in Web3 and blockchain operations.
You help users interact with blockchain networks, analyze smart contracts, and make informed decisions.
Always prioritize security and accuracy in your responses.
When dealing with financial operations, be extremely cautious and recommend users to verify all details.`;
    
    logger.info('BaseAgent initialized', { model });
  }

  /**
   * Execute an agent task
   */
  async executeTask(task: AgentTask): Promise<AgentResponse> {
    try {
      logger.info('Executing agent task', { taskId: task.id, type: task.type });
      
      const messages = [
        new SystemMessage(this.systemPrompt),
        new HumanMessage(this.buildPrompt(task)),
      ];

      const response = await this.llm.invoke(messages);
      const result = response.content;

      logger.info('Agent task completed', { taskId: task.id });
      
      return {
        taskId: task.id,
        success: true,
        result,
        reasoning: 'AI analysis completed',
        confidence: 0.85,
      };
    } catch (error) {
      logger.error('Error executing agent task', error);
      return {
        taskId: task.id,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Build a prompt from the task
   */
  protected buildPrompt(task: AgentTask): string {
    let prompt = task.prompt;
    
    if (task.context) {
      prompt += '\n\nContext:\n';
      prompt += Object.entries(task.context)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join('\n');
    }
    
    return prompt;
  }
}
