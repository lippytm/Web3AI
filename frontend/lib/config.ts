/**
 * Configuration validation for frontend environment variables.
 * Uses Zod for runtime type checking and validation.
 */

import { z } from 'zod';

/**
 * Environment configuration schema with validation rules.
 */
const envSchema = z.object({
  // Backend API URL
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:8000'),
  
  // Blockchain RPC URL
  NEXT_PUBLIC_RPC_URL: z.string().url().default('https://eth.llamarpc.com'),
  
  // Chain ID (1 for mainnet, 11155111 for sepolia, etc.)
  NEXT_PUBLIC_CHAIN_ID: z.coerce.number().int().positive().default(1),
  
  // AI Model name
  NEXT_PUBLIC_MODEL_NAME: z.string().min(1).default('GPT-5.1-Codex-Max'),
  
  // Optional telemetry settings
  NEXT_PUBLIC_TELEMETRY_ENABLED: z
    .string()
    .transform(val => val === 'true')
    .default('false'),
});

/**
 * Validated environment configuration type.
 */
export type EnvConfig = z.infer<typeof envSchema>;

/**
 * Validate and parse environment configuration.
 * 
 * @returns Validated environment configuration
 * @throws ZodError if validation fails
 */
export function validateConfig(): EnvConfig {
  const config = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
    NEXT_PUBLIC_MODEL_NAME: process.env.NEXT_PUBLIC_MODEL_NAME,
    NEXT_PUBLIC_TELEMETRY_ENABLED: process.env.NEXT_PUBLIC_TELEMETRY_ENABLED,
  };

  return envSchema.parse(config);
}

/**
 * Get validated environment configuration.
 * Safe to call multiple times - validation happens once.
 */
let cachedConfig: EnvConfig | null = null;

export function getConfig(): EnvConfig {
  if (!cachedConfig) {
    cachedConfig = validateConfig();
  }
  return cachedConfig;
}

/**
 * Smoke test for config validation (no network calls).
 * Validates that configuration can be parsed without errors.
 * 
 * @returns true if validation succeeds
 * @throws Error if validation fails
 */
export function smokeTestConfig(): boolean {
  try {
    const config = validateConfig();
    
    // Basic assertions (no network calls)
    if (!config.NEXT_PUBLIC_API_URL) {
      throw new Error('API URL must be set');
    }
    if (!config.NEXT_PUBLIC_RPC_URL) {
      throw new Error('RPC URL must be set');
    }
    if (!config.NEXT_PUBLIC_MODEL_NAME) {
      throw new Error('Model name must be set');
    }
    if (config.NEXT_PUBLIC_CHAIN_ID <= 0) {
      throw new Error('Chain ID must be positive');
    }
    
    return true;
  } catch (error) {
    throw new Error(`Config validation failed: ${error}`);
  }
}
