import { Router } from 'express';
import {
  getAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievementController';
import { verifyToken } from '../middleware/auth';
import { objectIdParam } from '../utils/validators';

const router = Router();

// Public
router.get('/', getAchievements);
router.get('/:id', objectIdParam('id'), getAchievement);

// Admin
router.post('/', verifyToken, createAchievement);
router.put('/:id', verifyToken, objectIdParam('id'), updateAchievement);
router.delete('/:id', verifyToken, objectIdParam('id'), deleteAchievement);

export default router;
