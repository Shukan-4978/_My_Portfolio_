import { Router } from 'express';
import {
  trackVisitor,
  getVisitors,
  getAnalytics,
} from '../controllers/visitorController';
import { verifyToken } from '../middleware/auth';

const router = Router();

// Public (track visits)
router.post('/track', trackVisitor);

// Admin
router.get('/', verifyToken, getVisitors);
router.get('/analytics', verifyToken, getAnalytics);

export default router;
