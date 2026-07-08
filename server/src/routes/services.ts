import { Router } from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  updateOrder,
} from '../controllers/serviceController';
import { verifyToken } from '../middleware/auth';
import { objectIdParam } from '../utils/validators';

const router = Router();

// Public
router.get('/', getServices);
router.get('/:id', objectIdParam('id'), getService);

// Admin
router.post('/', verifyToken, createService);
router.put('/:id', verifyToken, objectIdParam('id'), updateService);
router.delete('/:id', verifyToken, objectIdParam('id'), deleteService);
router.patch('/order', verifyToken, updateOrder);

export default router;
