import { Router } from 'express';
import {
  getData,
  getAllData,
  updateData,
  deleteData,
} from '../controllers/portfolioDataController';
import { verifyToken } from '../middleware/auth';

const router = Router();

// Public
router.get('/', getAllData);
router.get('/:key', getData);

// Admin
router.put('/:key', verifyToken, updateData);
router.delete('/:key', verifyToken, deleteData);

export default router;
