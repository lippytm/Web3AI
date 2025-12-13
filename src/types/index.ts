/**
 * Type definitions for Web3AI
 */

/**
 * Blockchain transaction request
 */
export interface TransactionRequest {
  to: string;
  value?: string;
  data?: string;
  gasLimit?: string;
}

/**
 * Blockchain query request
 */
export interface BlockchainQuery {
  type: 'balance' | 'contract' | 'block' | 'transaction';
  address?: string;
  blockNumber?: number;
  txHash?: string;
  contractAddress?: string;
  method?: string;
  params?: unknown[];
}

/**
 * AI Agent task
 */
export interface AgentTask {
  id: string;
  type: 'analysis' | 'transaction' | 'query' | 'prediction';
  prompt: string;
  context?: Record<string, unknown>;
  requiresConfirmation: boolean;
}

/**
 * AI Agent response
 */
export interface AgentResponse {
  taskId: string;
  success: boolean;
  result?: unknown;
  error?: string;
  reasoning?: string;
  confidence?: number;
}
