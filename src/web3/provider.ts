import { ethers } from 'ethers';
import { logger } from '../utils/logger.js';
import type { TransactionRequest, BlockchainQuery } from '../types/index.js';

/**
 * Web3 Provider service for blockchain interactions
 */
export class Web3Provider {
  private provider: ethers.JsonRpcProvider;
  private chainId: number;

  constructor(rpcUrl: string, chainId: number) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.chainId = chainId;
    logger.info('Web3Provider initialized', { chainId });
  }

  /**
   * Get the current block number
   */
  async getBlockNumber(): Promise<number> {
    try {
      const blockNumber = await this.provider.getBlockNumber();
      logger.debug('Current block number', { blockNumber });
      return blockNumber;
    } catch (error) {
      logger.error('Error getting block number', error);
      throw error;
    }
  }

  /**
   * Get balance of an address
   */
  async getBalance(address: string): Promise<string> {
    try {
      if (!ethers.isAddress(address)) {
        throw new Error(`Invalid address: ${address}`);
      }
      const balance = await this.provider.getBalance(address);
      const balanceInEth = ethers.formatEther(balance);
      logger.debug('Balance retrieved', { address, balance: balanceInEth });
      return balanceInEth;
    } catch (error) {
      logger.error('Error getting balance', error);
      throw error;
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<ethers.TransactionResponse | null> {
    try {
      const tx = await this.provider.getTransaction(txHash);
      logger.debug('Transaction retrieved', { txHash });
      return tx;
    } catch (error) {
      logger.error('Error getting transaction', error);
      throw error;
    }
  }

  /**
   * Execute a blockchain query
   */
  async executeQuery(query: BlockchainQuery): Promise<unknown> {
    switch (query.type) {
      case 'balance':
        if (!query.address) throw new Error('Address required for balance query');
        return this.getBalance(query.address);
      
      case 'block':
        if (query.blockNumber !== undefined) {
          return this.provider.getBlock(query.blockNumber);
        }
        return this.getBlockNumber();
      
      case 'transaction':
        if (!query.txHash) throw new Error('Transaction hash required');
        return this.getTransaction(query.txHash);
      
      default:
        throw new Error(`Unsupported query type: ${query.type}`);
    }
  }

  /**
   * Estimate gas for a transaction
   */
  async estimateGas(tx: TransactionRequest): Promise<string> {
    try {
      const gasEstimate = await this.provider.estimateGas({
        to: tx.to,
        value: tx.value ? ethers.parseEther(tx.value) : undefined,
        data: tx.data,
      });
      return gasEstimate.toString();
    } catch (error) {
      logger.error('Error estimating gas', error);
      throw error;
    }
  }

  /**
   * Get current gas price
   */
  async getGasPrice(): Promise<string> {
    try {
      const feeData = await this.provider.getFeeData();
      const gasPrice = feeData.gasPrice || BigInt(0);
      return ethers.formatUnits(gasPrice, 'gwei');
    } catch (error) {
      logger.error('Error getting gas price', error);
      throw error;
    }
  }
}
