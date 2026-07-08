import { Router } from 'express';
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  publishBlog,
  unpublishBlog,
  getAllBlogsAdmin,
} from '../controllers/blogController';
import { verifyToken } from '../middleware/auth';
import { uploadImage } from '../middleware/upload';
import { blogValidators, objectIdParam } from '../utils/validators';

const router = Router();

// Public
router.get('/', getBlogs);
router.get('/:slug', getBlog);

// Admin
router.get('/admin/all', verifyToken, getAllBlogsAdmin);
router.post('/', verifyToken, uploadImage, blogValidators, createBlog);
router.put('/:id', verifyToken, objectIdParam('id'), uploadImage, blogValidators, updateBlog);
router.delete('/:id', verifyToken, objectIdParam('id'), deleteBlog);
router.patch('/:id/publish', verifyToken, objectIdParam('id'), publishBlog);
router.patch('/:id/unpublish', verifyToken, objectIdParam('id'), unpublishBlog);

export default router;
