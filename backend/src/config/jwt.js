import dotenv from 'dotenv';

dotenv.config();

export default {
  secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  expiresIn: '24h'
};
