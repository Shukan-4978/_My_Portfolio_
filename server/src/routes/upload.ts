import { Router, Request, Response } from 'express';
import { uploadImage, uploadMultiple } from '../middleware/upload';
import { verifyToken } from '../middleware/auth';
import { successResponse } from '../utils/response';

const router = Router();

// POST /api/upload/single — Upload a single image (admin)
router.post(
  '/single',
  verifyToken,
  uploadImage,
  (req: Request, res: Response) => {
    const file = req.file as
      | (Express.Multer.File & { path: string; filename: string })
      | undefined;

    if (!file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }

    successResponse(
      res,
      {
        url: file.path,
        publicId: file.filename,
        originalName: file.originalname,
        size: file.size,
      },
      'Image uploaded successfully',
      201
    );
  }
);

// POST /api/upload/multiple — Upload up to 5 images (admin)
router.post(
  '/multiple',
  verifyToken,
  uploadMultiple,
  (req: Request, res: Response) => {
    const files = req.files as
      | Array<Express.Multer.File & { path: string; filename: string }>
      | undefined;

    if (!files || files.length === 0) {
      res.status(400).json({ success: false, message: 'No files uploaded' });
      return;
    }

    const uploaded = files.map((file) => ({
      url: file.path,
      publicId: file.filename,
      originalName: file.originalname,
      size: file.size,
    }));

    successResponse(res, uploaded, `${files.length} image(s) uploaded successfully`, 201);
  }
);

export default router;
