import api from './api';

export const blockchainService = {
  async getBalance(address, network = 'ethereum') {
    const response = await api.get('/blockchain/balance', {
      params: { address, network }
    });
    return response.data;
  },

  async getTransaction(txHash, network = 'ethereum') {
    const response = await api.get(`/blockchain/transaction/${txHash}`, {
      params: { network }
    });
    return response.data;
  },

  async getContractInfo(address, network = 'ethereum') {
    const response = await api.get(`/blockchain/contract/${address}`, {
      params: { network }
    });
    return response.data;
  },

  async saveInteraction(interactionData) {
    const response = await api.post('/blockchain/interactions', interactionData);
    return response.data;
  },

  async getUserInteractions() {
    const response = await api.get('/blockchain/interactions');
    return response.data;
  }
};
