import { ethers } from 'ethers';

class BlockchainService {
  constructor() {
    this.providers = {};
  }

  getProvider(network = 'ethereum') {
    if (!this.providers[network]) {
      // Using public RPC endpoints for demo
      const rpcUrls = {
        ethereum: process.env.ETHEREUM_RPC_URL || 'https://eth.llamarpc.com',
        polygon: process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com',
        sepolia: 'https://rpc.sepolia.org'
      };

      this.providers[network] = new ethers.JsonRpcProvider(rpcUrls[network]);
    }

    return this.providers[network];
  }

  async getBlockNumber(network = 'ethereum') {
    const provider = this.getProvider(network);
    return await provider.getBlockNumber();
  }

  async getBalance(address, network = 'ethereum') {
    try {
      const provider = this.getProvider(network);
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }

  async getTransaction(txHash, network = 'ethereum') {
    try {
      const provider = this.getProvider(network);
      const tx = await provider.getTransaction(txHash);
      return tx;
    } catch (error) {
      throw new Error(`Failed to get transaction: ${error.message}`);
    }
  }

  async getContractCode(address, network = 'ethereum') {
    try {
      const provider = this.getProvider(network);
      const code = await provider.getCode(address);
      return {
        address,
        hasCode: code !== '0x',
        codeSize: code.length,
        code: code.substring(0, 100) + '...' // Return first 100 chars
      };
    } catch (error) {
      throw new Error(`Failed to get contract code: ${error.message}`);
    }
  }

  validateAddress(address) {
    return ethers.isAddress(address);
  }

  async analyzeContract(address, network = 'ethereum') {
    try {
      const provider = this.getProvider(network);
      const code = await provider.getCode(address);
      
      if (code === '0x') {
        return {
          isContract: false,
          message: 'Address is not a smart contract'
        };
      }

      // Basic analysis for AI risk assessment
      return {
        isContract: true,
        codeSize: code.length,
        complexity: this.estimateComplexity(code),
        hasUpgradeable: code.includes('upgradeable'),
        // Additional metrics would be calculated here
        externalCalls: this.countExternalCalls(code),
        auditScore: 0.5 // Placeholder
      };
    } catch (error) {
      throw new Error(`Contract analysis failed: ${error.message}`);
    }
  }

  estimateComplexity(code) {
    // Simple complexity estimation based on code length
    const normalized = Math.min(code.length / 100000, 1);
    return normalized;
  }

  countExternalCalls(code) {
    // Simplified external call counting
    const callPattern = /call/gi;
    const matches = code.match(callPattern);
    return matches ? matches.length : 0;
  }
}

export default new BlockchainService();
