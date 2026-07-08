import { Router } from 'express';
import {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController';
import { verifyToken } from '../middleware/auth';
import { uploadImage } from '../middleware/upload';
import { objectIdParam } from '../utils/validators';

const router = Router();

// Public
router.get('/', getTestimonials);
router.get('/:id', objectIdParam('id'), getTestimonial);

// Admin
router.post('/', verifyToken, uploadImage, createTestimonial);
router.put('/:id', verifyToken, objectIdParam('id'), uploadImage, updateTestimonial);
router.delete('/:id', verifyToken, objectIdParam('id'), deleteTestimonial);

export default router;
