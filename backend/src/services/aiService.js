import * as tf from '@tensorflow/tfjs';

class AIService {
  constructor() {
    this.model = null;
  }

  async initializeModel() {
    // Create a simple neural network for demonstration
    // In production, this would be a pre-trained model
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [10], units: 64, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 3, activation: 'softmax' }) // low, medium, high risk
      ]
    });

    this.model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    console.log('AI Model initialized');
  }

  /**
   * Assess smart contract risk based on various features
   * @param {Object} contractData - Contract analysis data
   * @returns {Object} Risk assessment result
   */
  async assessSmartContractRisk(contractData) {
    try {
      // Extract features from contract data
      const features = this.extractFeatures(contractData);
      
      // Normalize features
      const normalizedFeatures = this.normalizeFeatures(features);
      
      // Convert to tensor
      const inputTensor = tf.tensor2d([normalizedFeatures]);
      
      // Make prediction
      const prediction = this.model.predict(inputTensor);
      const probabilities = await prediction.data();
      
      // Clean up tensors
      inputTensor.dispose();
      prediction.dispose();
      
      // Interpret results
      const riskLevels = ['low', 'medium', 'high'];
      const maxProbIndex = probabilities.indexOf(Math.max(...probabilities));
      
      return {
        riskLevel: riskLevels[maxProbIndex],
        confidence: probabilities[maxProbIndex],
        probabilities: {
          low: probabilities[0],
          medium: probabilities[1],
          high: probabilities[2]
        },
        analysis: this.generateAnalysis(contractData, riskLevels[maxProbIndex])
      };
    } catch (error) {
      console.error('AI prediction error:', error);
      throw error;
    }
  }

  extractFeatures(contractData) {
    // Extract 10 features for the model
    // In production, these would be real contract metrics
    return [
      contractData.complexity || 0.5,
      contractData.transactionCount || 0,
      contractData.uniqueUsers || 0,
      contractData.totalValue || 0,
      contractData.codeSize || 0,
      contractData.externalCalls || 0,
      contractData.hasOwner ? 1 : 0,
      contractData.hasUpgradeable ? 1 : 0,
      contractData.auditScore || 0.5,
      contractData.timeDeployed || 0
    ];
  }

  normalizeFeatures(features) {
    // Simple min-max normalization to [0, 1]
    return features.map((feature, index) => {
      const max = [1, 10000, 1000, 1000000, 50000, 100, 1, 1, 1, 365];
      return Math.min(feature / max[index], 1);
    });
  }

  generateAnalysis(contractData, riskLevel) {
    const insights = [];
    
    if (contractData.complexity > 0.7) {
      insights.push('High code complexity detected');
    }
    
    if (contractData.externalCalls > 5) {
      insights.push('Multiple external calls may pose security risks');
    }
    
    if (!contractData.hasOwner) {
      insights.push('No owner control - immutable contract');
    }
    
    if (contractData.hasUpgradeable) {
      insights.push('Upgradeable contract - verify upgrade controls');
    }
    
    if (contractData.auditScore < 0.5) {
      insights.push('Low audit score - consider professional audit');
    }
    
    return {
      riskLevel,
      insights,
      recommendation: this.getRecommendation(riskLevel)
    };
  }

  getRecommendation(riskLevel) {
    const recommendations = {
      low: 'Contract appears to have low risk. Standard precautions apply.',
      medium: 'Moderate risk detected. Review contract carefully before interaction.',
      high: 'High risk detected. Exercise extreme caution or avoid interaction.'
    };
    return recommendations[riskLevel];
  }
}

export default new AIService();
