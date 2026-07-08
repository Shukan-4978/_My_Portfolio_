import { Router } from 'express';
import {
  getCertificates,
  getCertificate,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  updateOrder,
} from '../controllers/certificateController';
import { verifyToken } from '../middleware/auth';
import { uploadImage } from '../middleware/upload';
import { objectIdParam } from '../utils/validators';

const router = Router();

// Public
router.get('/', getCertificates);
router.get('/:id', objectIdParam('id'), getCertificate);

// Admin
router.post('/', verifyToken, uploadImage, createCertificate);
router.put('/:id', verifyToken, objectIdParam('id'), uploadImage, updateCertificate);
router.delete('/:id', verifyToken, objectIdParam('id'), deleteCertificate);
router.patch('/order', verifyToken, updateOrder);

export default router;
