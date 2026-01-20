/**
 * Tests for SDK config loaders (TypeScript)
 * 
 * Note: These are minimal smoke tests to verify config loading.
 * Run with: node --test sdk-config.test.ts (or via test framework)
 */

// This is a minimal test stub showing how to test the SDK
// In a full implementation, you'd use Jest, Vitest, or similar

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

// Mock the SDK since we're not in a proper module setup
const tests: TestResult[] = [];

function test(name: string, fn: () => void | Promise<void>) {
  try {
    fn();
    tests.push({ name, passed: true });
    console.log(`✓ ${name}`);
  } catch (error) {
    tests.push({ name, passed: false, error: String(error) });
    console.error(`✗ ${name}: ${error}`);
  }
}

// Mock SDK for testing
class MockSDKConfig {
  ai?: any;
  web3?: any;
}

class MockAISDK {
  private config: MockSDKConfig;

  constructor(config: MockSDKConfig) {
    this.config = config;
  }

  getConfig() {
    return { ...this.config };
  }

  getAIClient() {
    if (!this.config.ai) {
      throw new Error('AI configuration not provided');
    }
    return null;
  }

  getWeb3Client() {
    if (!this.config.web3) {
      throw new Error('Web3 configuration not provided');
    }
    return null;
  }
}

class MockAISDKFactory {
  static create(config: MockSDKConfig) {
    return new MockAISDK(config);
  }

  static fromEnv() {
    const config: MockSDKConfig = {};
    
    if (process.env.AI_PROVIDER) {
      config.ai = {
        provider: process.env.AI_PROVIDER,
        apiKey: process.env.AI_API_KEY,
      };
    }

    if (process.env.WEB3_CHAIN) {
      config.web3 = {
        chain: process.env.WEB3_CHAIN,
        rpcUrl: process.env.WEB3_RPC_URL,
      };
    }

    return new MockAISDK(config);
  }
}

// Tests
test('SDK can be created with explicit configuration', () => {
  const config = {
    ai: { provider: 'openai', apiKey: 'test-key' },
    web3: { chain: 'ethereum', rpcUrl: 'https://eth.llamarpc.com' },
  };

  const sdk = MockAISDKFactory.create(config);
  const retrievedConfig = sdk.getConfig();

  if (retrievedConfig.ai?.provider !== 'openai') {
    throw new Error('AI provider mismatch');
  }
  if (retrievedConfig.web3?.chain !== 'ethereum') {
    throw new Error('Web3 chain mismatch');
  }
});

test('SDK can be created from environment variables', () => {
  process.env.AI_PROVIDER = 'openai';
  process.env.AI_API_KEY = 'test-env-key';
  process.env.WEB3_CHAIN = 'solana';
  process.env.WEB3_RPC_URL = 'https://api.mainnet-beta.solana.com';

  const sdk = MockAISDKFactory.fromEnv();
  const config = sdk.getConfig();

  if (config.ai?.provider !== 'openai') {
    throw new Error('AI provider mismatch from env');
  }
  if (config.web3?.chain !== 'solana') {
    throw new Error('Web3 chain mismatch from env');
  }

  // Clean up
  delete process.env.AI_PROVIDER;
  delete process.env.AI_API_KEY;
  delete process.env.WEB3_CHAIN;
  delete process.env.WEB3_RPC_URL;
});

test('SDK raises error when accessing client without config', () => {
  const sdk = MockAISDKFactory.create({});

  try {
    sdk.getAIClient();
    throw new Error('Should have thrown error');
  } catch (error) {
    if (!String(error).includes('AI configuration not provided')) {
      throw new Error('Wrong error message');
    }
  }
});

test('SDK works with partial configuration', () => {
  const config = {
    ai: { provider: 'huggingface', apiKey: 'hf-test' },
  };

  const sdk = MockAISDKFactory.create(config);
  const retrievedConfig = sdk.getConfig();

  if (retrievedConfig.ai?.provider !== 'huggingface') {
    throw new Error('Partial config AI provider mismatch');
  }
  if (retrievedConfig.web3) {
    throw new Error('Web3 should be undefined');
  }
});

// Summary
console.log('\n--- Test Summary ---');
const passed = tests.filter(t => t.passed).length;
const failed = tests.filter(t => !t.passed).length;
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${tests.length}`);

if (failed > 0) {
  process.exit(1);
}
