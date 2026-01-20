/**
 * Tests for SDK config loaders (JavaScript/Node.js)
 * 
 * Note: These are minimal smoke tests to verify config loading.
 * Run with: node sdk-config.test.js
 */

// Mock SDK for testing
class MockSDKConfig {
  constructor(config = {}) {
    this.ai = config.ai;
    this.web3 = config.web3;
    this.messaging = config.messaging;
    this.storage = config.storage;
  }
}

class MockAISDK {
  constructor(config) {
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
  static create(config) {
    return new MockAISDK(config);
  }

  static fromEnv() {
    const config = {};
    
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

// Test runner
const tests = [];

function test(name, fn) {
  try {
    fn();
    tests.push({ name, passed: true });
    console.log(`✓ ${name}`);
  } catch (error) {
    tests.push({ name, passed: false, error: String(error) });
    console.error(`✗ ${name}: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
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

  assert(retrievedConfig.ai.provider === 'openai', 'AI provider mismatch');
  assert(retrievedConfig.web3.chain === 'ethereum', 'Web3 chain mismatch');
});

test('SDK can be created from environment variables', () => {
  process.env.AI_PROVIDER = 'openai';
  process.env.AI_API_KEY = 'test-env-key';
  process.env.WEB3_CHAIN = 'solana';
  process.env.WEB3_RPC_URL = 'https://api.mainnet-beta.solana.com';

  const sdk = MockAISDKFactory.fromEnv();
  const config = sdk.getConfig();

  assert(config.ai.provider === 'openai', 'AI provider mismatch from env');
  assert(config.web3.chain === 'solana', 'Web3 chain mismatch from env');

  // Clean up
  delete process.env.AI_PROVIDER;
  delete process.env.AI_API_KEY;
  delete process.env.WEB3_CHAIN;
  delete process.env.WEB3_RPC_URL;
});

test('SDK raises error when accessing client without config', () => {
  const sdk = MockAISDKFactory.create({});

  let errorThrown = false;
  try {
    sdk.getAIClient();
  } catch (error) {
    errorThrown = true;
    assert(error.message.includes('AI configuration not provided'), 'Wrong error message');
  }
  assert(errorThrown, 'Should have thrown error');
});

test('SDK works with partial configuration', () => {
  const config = {
    ai: { provider: 'huggingface', apiKey: 'hf-test' },
  };

  const sdk = MockAISDKFactory.create(config);
  const retrievedConfig = sdk.getConfig();

  assert(retrievedConfig.ai.provider === 'huggingface', 'Partial config AI provider mismatch');
  assert(!retrievedConfig.web3, 'Web3 should be undefined');
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
