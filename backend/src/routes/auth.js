import express from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authLimiter, generalLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes with strict rate limiting
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);

// Protected routes with general rate limiting
router.get('/profile', generalLimiter, authenticateToken, getProfile);
router.put('/profile', generalLimiter, authenticateToken, updateProfile);

export default router;
