/**
 * Smoke test for config validation.
 * Run with: npm run config:validate
 */

import { smokeTestConfig, validateConfig } from './config';

console.log('Running config validation smoke test...');

try {
  // Test 1: Smoke test
  console.log('Test 1: Running smoke test...');
  const result = smokeTestConfig();
  console.log('✓ Smoke test passed');

  // Test 2: Validate config
  console.log('Test 2: Validating config...');
  const config = validateConfig();
  console.log('✓ Config validation passed');
  console.log('Config:', JSON.stringify(config, null, 2));

  console.log('\n✅ All config validation tests passed!');
  process.exit(0);
} catch (error) {
  console.error('\n❌ Config validation failed:');
  console.error(error);
  process.exit(1);
}
