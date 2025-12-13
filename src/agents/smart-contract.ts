import { BaseAgent } from './base.js';
import type { AgentTask, AgentResponse } from '../types/index.js';
import { logger } from '../utils/logger.js';

/**
 * Smart Contract Agent
 * Specialized in understanding and interacting with smart contracts
 */
export class SmartContractAgent extends BaseAgent {
  constructor(apiKey: string, model: string = 'gpt-4') {
    super(apiKey, model);
    
    this.systemPrompt = `You are a smart contract expert AI agent.
You help users understand, audit, and interact with smart contracts on blockchain networks.
Your expertise includes:
- Smart contract code analysis
- Security vulnerability detection
- Function call parameter recommendations
- ABI interpretation
- Gas optimization for contract interactions

Always prioritize security and provide clear explanations of contract functionality.`;
    
    logger.info('SmartContractAgent initialized');
  }

  /**
   * Analyze a smart contract
   */
  async analyzeContract(contractAddress: string, abi?: unknown): Promise<AgentResponse> {
    const task: AgentTask = {
      id: `contract-analysis-${Date.now()}`,
      type: 'analysis',
      prompt: `Analyze this smart contract and provide insights about its functionality, potential risks, and recommended interactions.`,
      context: {
        contractAddress,
        abi: abi || 'Not provided',
      },
      requiresConfirmation: false,
    };

    return await this.executeTask(task);
  }

  /**
   * Generate safe parameters for a contract function call
   */
  async suggestFunctionParameters(
    functionSignature: string,
    userIntent: string
  ): Promise<AgentResponse> {
    const task: AgentTask = {
      id: `param-suggestion-${Date.now()}`,
      type: 'analysis',
      prompt: `Based on the user's intent, suggest safe and appropriate parameters for calling this smart contract function.`,
      context: {
        functionSignature,
        userIntent,
      },
      requiresConfirmation: true,
    };

    return await this.executeTask(task);
  }
}
