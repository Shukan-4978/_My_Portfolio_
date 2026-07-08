import { Router } from 'express';
import {
  sendMessage,
  getMessages,
  markRead,
  markAllRead,
  deleteMessage,
} from '../controllers/messageController';
import { verifyToken } from '../middleware/auth';
import { contactLimiter } from '../middleware/rateLimiter';
import { contactValidators, objectIdParam } from '../utils/validators';

const router = Router();

// Public (rate-limited)
router.post('/', contactLimiter, contactValidators, sendMessage);

// Admin
router.get('/', verifyToken, getMessages);
router.patch('/mark-all-read', verifyToken, markAllRead);
router.patch('/:id/read', verifyToken, objectIdParam('id'), markRead);
router.delete('/:id', verifyToken, objectIdParam('id'), deleteMessage);

export default router;
