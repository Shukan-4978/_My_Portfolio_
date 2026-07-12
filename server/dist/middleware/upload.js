"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultiple = exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = require("../config/cloudinary");
const ALLOWED_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.cloudinary,
    params: async (req, file) => {
        const folder = req.query.folder || 'portfolio';
        return {
            folder,
            allowed_formats: ALLOWED_FORMATS,
            transformation: [{ quality: 'auto', fetch_format: 'auto' }],
            resource_type: 'image',
        };
    },
});
const fileFilter = (_req, file, cb) => {
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
    }
    else {
        cb(new Error(`Invalid file type. Only images are allowed (${ALLOWED_FORMATS.join(', ')})`));
    }
};
const multerOptions = {
    storage,
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
};
const upload = (0, multer_1.default)(multerOptions);
// Single image upload middleware
exports.uploadImage = upload.single('image');
// Multiple images upload middleware (max 5)
exports.uploadMultiple = upload.array('images', 5);
//# sourceMappingURL=upload.js.map