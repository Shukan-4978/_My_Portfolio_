import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  updateOrder,
} from '../controllers/projectController';
import { verifyToken } from '../middleware/auth';
import { uploadMultiple } from '../middleware/upload';
import { projectValidators, objectIdParam } from '../utils/validators';

const router = Router();

// Public
router.get('/', getProjects);
router.get('/:id', objectIdParam('id'), getProject);

// Admin
router.post('/', verifyToken, uploadMultiple, projectValidators, createProject);
router.put('/:id', verifyToken, objectIdParam('id'), uploadMultiple, projectValidators, updateProject);
router.delete('/:id', verifyToken, objectIdParam('id'), deleteProject);
router.patch('/order', verifyToken, updateOrder);

export default router;
