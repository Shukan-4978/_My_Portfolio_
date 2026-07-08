import { Router } from 'express';
import {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
  updateOrder,
} from '../controllers/skillController';
import { verifyToken } from '../middleware/auth';
import { objectIdParam } from '../utils/validators';

const router = Router();

// Public
router.get('/', getSkills);
router.get('/:id', objectIdParam('id'), getSkill);

// Admin
router.post('/', verifyToken, createSkill);
router.put('/:id', verifyToken, objectIdParam('id'), updateSkill);
router.delete('/:id', verifyToken, objectIdParam('id'), deleteSkill);
router.patch('/order', verifyToken, updateOrder);

export default router;
