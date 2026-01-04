import express from 'express';
import {
  assessContractRisk,
  getPrediction,
  getModelInfo
} from '../controllers/aiController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// AI endpoints (protected)
router.post('/assess-risk', authenticateToken, assessContractRisk);
router.post('/predict', authenticateToken, getPrediction);
router.get('/model-info', getModelInfo);

export default router;
