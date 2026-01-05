import express from 'express';
import {
  assessContractRisk,
  getPrediction,
  getModelInfo
} from '../controllers/aiController.js';
import { authenticateToken } from '../middleware/auth.js';
import { aiLimiter, generalLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// AI endpoints (protected with rate limiting)
router.post('/assess-risk', aiLimiter, authenticateToken, assessContractRisk);
router.post('/predict', aiLimiter, authenticateToken, getPrediction);
router.get('/model-info', generalLimiter, getModelInfo);

export default router;
