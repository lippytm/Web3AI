import { BaseAgent } from './base.js';
import type { AgentTask, AgentResponse } from '../types/index.js';
import type { Web3Provider } from '../web3/provider.js';
import { logger } from '../utils/logger.js';

/**
 * Blockchain Analysis Agent
 * Specialized in analyzing blockchain data and providing insights
 */
export class BlockchainAnalysisAgent extends BaseAgent {
  private web3Provider: Web3Provider;

  constructor(apiKey: string, web3Provider: Web3Provider, model: string = 'gpt-4') {
    super(apiKey, model);
    this.web3Provider = web3Provider;
    
    this.systemPrompt = `You are a blockchain analysis expert AI agent.
You analyze on-chain data, smart contracts, and transaction patterns.
You provide insights on:
- Address activity and behavior
- Transaction analysis
- Gas optimization recommendations
- Smart contract security assessments
- Market trends and patterns

Always base your analysis on factual on-chain data and clearly state your confidence level.`;
    
    logger.info('BlockchainAnalysisAgent initialized');
  }

  /**
   * Analyze a blockchain address
   */
  async analyzeAddress(address: string): Promise<AgentResponse> {
    try {
      logger.info('Analyzing address', { address });
      
      // Fetch on-chain data
      const balance = await this.web3Provider.getBalance(address);
      const blockNumber = await this.web3Provider.getBlockNumber();
      
      const task: AgentTask = {
        id: `analyze-${Date.now()}`,
        type: 'analysis',
        prompt: `Analyze this Ethereum address and provide insights about its activity and characteristics.`,
        context: {
          address,
          balance,
          currentBlock: blockNumber,
        },
        requiresConfirmation: false,
      };

      return await this.executeTask(task);
    } catch (error) {
      logger.error('Error analyzing address', error);
      throw error;
    }
  }

  /**
   * Analyze gas prices and recommend optimal strategy
   */
  async analyzeGasPrices(): Promise<AgentResponse> {
    try {
      logger.info('Analyzing gas prices');
      
      const gasPrice = await this.web3Provider.getGasPrice();
      
      const task: AgentTask = {
        id: `gas-analysis-${Date.now()}`,
        type: 'analysis',
        prompt: `Analyze current gas prices and recommend the best time to execute transactions.`,
        context: {
          currentGasPrice: gasPrice,
          unit: 'gwei',
        },
        requiresConfirmation: false,
      };

      return await this.executeTask(task);
    } catch (error) {
      logger.error('Error analyzing gas prices', error);
      throw error;
    }
  }
}
