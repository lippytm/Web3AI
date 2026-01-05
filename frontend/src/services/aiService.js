import api from './api';

export const aiService = {
  async assessContractRisk(contractAddress, network = 'ethereum') {
    const response = await api.post('/ai/assess-risk', {
      contractAddress,
      network
    });
    return response.data;
  },

  async getPrediction(data) {
    const response = await api.post('/ai/predict', { data });
    return response.data;
  },

  async getModelInfo() {
    const response = await api.get('/ai/model-info');
    return response.data;
  }
};
