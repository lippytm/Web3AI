import { loadConfig, validateConfig } from '../utils/config.js';

describe('Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('loadConfig', () => {
    it('should load default configuration', () => {
      const config = loadConfig();
      expect(config).toBeDefined();
      expect(config.openaiModel).toBe('gpt-4');
      expect(config.chainId).toBe(1);
      expect(config.logLevel).toBe('info');
    });

    it('should load configuration from environment variables', () => {
      process.env.OPENAI_API_KEY = 'test-key';
      process.env.OPENAI_MODEL = 'gpt-3.5-turbo';
      process.env.RPC_URL = 'https://test-rpc.example.com';
      process.env.CHAIN_ID = '5';
      process.env.LOG_LEVEL = 'debug';

      const config = loadConfig();
      expect(config.openaiApiKey).toBe('test-key');
      expect(config.openaiModel).toBe('gpt-3.5-turbo');
      expect(config.rpcUrl).toBe('https://test-rpc.example.com');
      expect(config.chainId).toBe(5);
      expect(config.logLevel).toBe('debug');
    });
  });

  describe('validateConfig', () => {
    it('should throw error if OPENAI_API_KEY is missing', () => {
      const config = loadConfig();
      config.openaiApiKey = '';
      
      expect(() => validateConfig(config)).toThrow('OPENAI_API_KEY is required');
    });

    it('should throw error if RPC_URL is invalid', () => {
      const config = loadConfig();
      config.openaiApiKey = 'test-key';
      config.rpcUrl = 'https://eth-mainnet.g.alchemy.com/v2/your-api-key';
      
      expect(() => validateConfig(config)).toThrow('Valid RPC_URL is required');
    });

    it('should not throw error for valid configuration', () => {
      const config = loadConfig();
      config.openaiApiKey = 'test-key';
      config.rpcUrl = 'https://test-rpc.example.com';
      
      expect(() => validateConfig(config)).not.toThrow();
    });
  });
});
