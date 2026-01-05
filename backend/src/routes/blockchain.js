import express from 'express';
import {
  getBalance,
  getTransaction,
  getContractInfo,
  saveInteraction,
  getUserInteractions
} from '../controllers/blockchainController.js';
import { authenticateToken } from '../middleware/auth.js';
import { generalLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes with rate limiting
router.get('/balance', generalLimiter, getBalance);
router.get('/transaction/:txHash', generalLimiter, getTransaction);
router.get('/contract/:address', generalLimiter, getContractInfo);

// Protected routes with rate limiting
router.post('/interactions', generalLimiter, authenticateToken, saveInteraction);
router.get('/interactions', generalLimiter, authenticateToken, getUserInteractions);

export default router;
