"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../middleware/upload");
const auth_1 = require("../middleware/auth");
const response_1 = require("../utils/response");
const router = (0, express_1.Router)();
// POST /api/upload/single — Upload a single image (admin)
router.post('/single', auth_1.verifyToken, upload_1.uploadImage, (req, res) => {
    const file = req.file;
    if (!file) {
        res.status(400).json({ success: false, message: 'No file uploaded' });
        return;
    }
    (0, response_1.successResponse)(res, {
        url: file.path,
        publicId: file.filename,
        originalName: file.originalname,
        size: file.size,
    }, 'Image uploaded successfully', 201);
});
// POST /api/upload/multiple — Upload up to 5 images (admin)
router.post('/multiple', auth_1.verifyToken, upload_1.uploadMultiple, (req, res) => {
    const files = req.files;
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
    (0, response_1.successResponse)(res, uploaded, `${files.length} image(s) uploaded successfully`, 201);
});
exports.default = router;
//# sourceMappingURL=upload.js.map