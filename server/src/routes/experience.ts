import { Router } from 'express';
import {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  updateOrder,
} from '../controllers/experienceController';
import { verifyToken } from '../middleware/auth';
import { objectIdParam } from '../utils/validators';

const router = Router();

// Public
router.get('/', getExperiences);
router.get('/:id', objectIdParam('id'), getExperience);

// Admin
router.post('/', verifyToken, createExperience);
router.put('/:id', verifyToken, objectIdParam('id'), updateExperience);
router.delete('/:id', verifyToken, objectIdParam('id'), deleteExperience);
router.patch('/order', verifyToken, updateOrder);

export default router;
