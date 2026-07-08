import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from '../config/cloudinary';
import { Request } from 'express';

const ALLOWED_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req: Request, file: Express.Multer.File) => {
    const folder = (req.query.folder as string) || 'portfolio';
    return {
      folder,
      allowed_formats: ALLOWED_FORMATS,
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      resource_type: 'image',
    };
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const mimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'image/avif',
  ];

  if (mimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type. Only images are allowed (${ALLOWED_FORMATS.join(', ')})`
      )
    );
  }
};

const multerOptions: multer.Options = {
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
};

const upload = multer(multerOptions);

// Single image upload middleware
export const uploadImage = upload.single('image');

// Multiple images upload middleware (max 5)
export const uploadMultiple = upload.array('images', 5);
