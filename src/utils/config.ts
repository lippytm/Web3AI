/**
 * Configuration management for Web3AI
 */

export interface Config {
  // AI Configuration
  openaiApiKey: string;
  openaiModel: string;
  
  // Web3 Configuration
  rpcUrl: string;
  chainId: number;
  
  // Application Configuration
  logLevel: string;
}

/**
 * Load configuration from environment variables
 */
export function loadConfig(): Config {
  const config: Config = {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    openaiModel: process.env.OPENAI_MODEL || 'gpt-4',
    rpcUrl: process.env.RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/your-api-key',
    chainId: parseInt(process.env.CHAIN_ID || '1', 10),
    logLevel: process.env.LOG_LEVEL || 'info',
  };

  return config;
}

/**
 * Validate configuration
 */
export function validateConfig(config: Config): void {
  const errors: string[] = [];

  if (!config.openaiApiKey) {
    errors.push('OPENAI_API_KEY is required');
  }

  if (!config.rpcUrl || config.rpcUrl.includes('your-api-key')) {
    errors.push('Valid RPC_URL is required');
  }

  if (errors.length > 0) {
    throw new Error(`Configuration errors:\n${errors.join('\n')}`);
  }
}
