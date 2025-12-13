import { pathToFileURL } from 'url';
import dotenv from 'dotenv';
import { loadConfig, validateConfig } from './utils/config.js';
import { logger } from './utils/logger.js';
import { Web3Provider } from './web3/provider.js';
import { BlockchainAnalysisAgent } from './agents/blockchain-analysis.js';
import { SmartContractAgent } from './agents/smart-contract.js';

// Load environment variables
dotenv.config();

/**
 * Main entry point for Web3AI
 */
async function main() {
  try {
    logger.info('Starting Web3AI...');

    // Load and validate configuration
    const config = loadConfig();
    
    // Note: We skip validation in demo mode to allow running without API keys
    const isDemoMode = !config.openaiApiKey || config.rpcUrl.includes('your-api-key');
    
    if (!isDemoMode) {
      validateConfig(config);
    } else {
      logger.warn('Running in DEMO mode - AI features and Web3 interactions will be limited');
      logger.warn('Please set OPENAI_API_KEY and RPC_URL environment variables for full functionality');
    }

    // Initialize Web3 provider
    const web3Provider = new Web3Provider(config.rpcUrl, config.chainId);
    
    logger.info('Web3AI initialized successfully');
    
    if (!isDemoMode) {
      // Initialize AI agents
      const blockchainAgent = new BlockchainAnalysisAgent(config.openaiApiKey, web3Provider, config.openaiModel);
      const contractAgent = new SmartContractAgent(config.openaiApiKey, config.openaiModel);
      
      logger.info('AI agents initialized successfully');
      
      // Example usage (commented out for now)
      // const result = await blockchainAgent.analyzeGasPrices();
      // logger.info('Analysis result', result);
    }

    logger.info('Web3AI is ready!');
    logger.info('To use Web3AI:');
    logger.info('1. Set OPENAI_API_KEY in your .env file');
    logger.info('2. Set RPC_URL to your blockchain RPC endpoint');
    logger.info('3. Import and use the agents in your code');

  } catch (error) {
    logger.error('Error starting Web3AI', error);
    process.exit(1);
  }
}

// Run if this is the main module
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    logger.error('Unhandled error', error);
    process.exit(1);
  });
}

export { Web3Provider, BlockchainAnalysisAgent, SmartContractAgent };
