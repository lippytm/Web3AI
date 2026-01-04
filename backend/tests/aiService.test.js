import { describe, it, expect } from '@jest/globals';
import aiService from '../src/services/aiService.js';

describe('AI Service', () => {
  it('should initialize AI model', async () => {
    await aiService.initializeModel();
    expect(aiService.model).toBeTruthy();
  });

  it('should assess smart contract risk', async () => {
    await aiService.initializeModel();
    const contractData = {
      complexity: 0.5,
      transactionCount: 100,
      uniqueUsers: 50,
      totalValue: 1000,
      codeSize: 5000,
      externalCalls: 5,
      hasOwner: true,
      hasUpgradeable: false,
      auditScore: 0.7,
      timeDeployed: 30
    };

    const result = await aiService.assessSmartContractRisk(contractData);
    
    expect(result).toBeTruthy();
    expect(result.riskLevel).toMatch(/low|medium|high/);
    expect(result.confidence).toBeGreaterThan(0);
    expect(result.probabilities).toBeTruthy();
  });
});
