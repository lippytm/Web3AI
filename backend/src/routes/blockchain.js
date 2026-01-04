import express from 'express';
import {
  getBalance,
  getTransaction,
  getContractInfo,
  saveInteraction,
  getUserInteractions
} from '../controllers/blockchainController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/balance', getBalance);
router.get('/transaction/:txHash', getTransaction);
router.get('/contract/:address', getContractInfo);

// Protected routes
router.post('/interactions', authenticateToken, saveInteraction);
router.get('/interactions', authenticateToken, getUserInteractions);

export default router;
