import { Router } from 'express';
import {
  login,
  logout,
  refreshToken,
  getMe,
} from '../controllers/authController';
import { verifyToken } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimiter';
import { loginValidators } from '../utils/validators';

const router = Router();

// Public routes
router.post('/login', authLimiter, loginValidators, login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);

// Protected routes
router.get('/me', verifyToken, getMe);

export default router;
