import aiService from '../services/aiService.js';
import blockchainService from '../services/blockchainService.js';

export const assessContractRisk = async (req, res, next) => {
  try {
    const { contractAddress, network } = req.body;

    if (!contractAddress) {
      return res.status(400).json({ error: 'Contract address is required' });
    }

    if (!blockchainService.validateAddress(contractAddress)) {
      return res.status(400).json({ error: 'Invalid contract address' });
    }

    // Analyze contract on blockchain
    const contractAnalysis = await blockchainService.analyzeContract(
      contractAddress,
      network || 'ethereum'
    );

    if (!contractAnalysis.isContract) {
      return res.status(400).json({ error: 'Address is not a smart contract' });
    }

    // Prepare data for AI assessment
    const contractData = {
      address: contractAddress,
      network: network || 'ethereum',
      complexity: contractAnalysis.complexity,
      codeSize: contractAnalysis.codeSize,
      externalCalls: contractAnalysis.externalCalls,
      hasUpgradeable: contractAnalysis.hasUpgradeable,
      auditScore: contractAnalysis.auditScore || 0.5,
      transactionCount: 100, // Would be fetched from blockchain
      uniqueUsers: 50, // Would be calculated
      totalValue: 1000, // Would be calculated
      hasOwner: true, // Would be determined from contract
      timeDeployed: 30 // Days since deployment
    };

    // Get AI risk assessment
    const riskAssessment = await aiService.assessSmartContractRisk(contractData);

    res.json({
      contractAddress,
      network: network || 'ethereum',
      analysis: contractAnalysis,
      riskAssessment
    });
  } catch (error) {
    next(error);
  }
};

export const getPrediction = async (req, res, next) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'Data is required for prediction' });
    }

    // Generic prediction endpoint
    const result = await aiService.assessSmartContractRisk(data);

    res.json({
      prediction: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const getModelInfo = async (req, res, next) => {
  try {
    res.json({
      model: 'Smart Contract Risk Assessment',
      version: '1.0.0',
      description: 'Neural network model for assessing smart contract risks',
      inputFeatures: [
        'complexity',
        'transactionCount',
        'uniqueUsers',
        'totalValue',
        'codeSize',
        'externalCalls',
        'hasOwner',
        'hasUpgradeable',
        'auditScore',
        'timeDeployed'
      ],
      outputClasses: ['low', 'medium', 'high']
    });
  } catch (error) {
    next(error);
  }
};
