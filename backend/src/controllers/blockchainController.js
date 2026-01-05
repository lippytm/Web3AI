import blockchainService from '../services/blockchainService.js';
import { BlockchainInteraction } from '../models/index.js';

export const getBalance = async (req, res, next) => {
  try {
    const { address, network } = req.query;

    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    if (!blockchainService.validateAddress(address)) {
      return res.status(400).json({ error: 'Invalid Ethereum address' });
    }

    const balance = await blockchainService.getBalance(address, network);

    res.json({
      address,
      network: network || 'ethereum',
      balance,
      unit: 'ETH'
    });
  } catch (error) {
    next(error);
  }
};

export const getTransaction = async (req, res, next) => {
  try {
    const { txHash } = req.params;
    const { network } = req.query;

    const transaction = await blockchainService.getTransaction(txHash, network);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({
      transaction: {
        hash: transaction.hash,
        from: transaction.from,
        to: transaction.to,
        value: transaction.value ? transaction.value.toString() : '0',
        blockNumber: transaction.blockNumber,
        gasLimit: transaction.gasLimit ? transaction.gasLimit.toString() : null,
        gasPrice: transaction.gasPrice ? transaction.gasPrice.toString() : null
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getContractInfo = async (req, res, next) => {
  try {
    const { address } = req.params;
    const { network } = req.query;

    if (!blockchainService.validateAddress(address)) {
      return res.status(400).json({ error: 'Invalid contract address' });
    }

    const contractInfo = await blockchainService.getContractCode(address, network);

    res.json(contractInfo);
  } catch (error) {
    next(error);
  }
};

export const saveInteraction = async (req, res, next) => {
  try {
    const { transactionHash, contractAddress, method, network, metadata } = req.body;

    if (!transactionHash || !method) {
      return res.status(400).json({ error: 'Transaction hash and method are required' });
    }

    const interaction = await BlockchainInteraction.create({
      userId: req.user.id,
      transactionHash,
      contractAddress,
      method,
      network: network || 'ethereum',
      status: 'pending',
      metadata
    });

    res.status(201).json({
      message: 'Interaction saved successfully',
      interaction
    });
  } catch (error) {
    next(error);
  }
};

export const getUserInteractions = async (req, res, next) => {
  try {
    const interactions = await BlockchainInteraction.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
      limit: 50
    });

    res.json({ interactions });
  } catch (error) {
    next(error);
  }
};
