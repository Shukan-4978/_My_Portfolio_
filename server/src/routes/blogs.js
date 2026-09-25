"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const validators_1 = require("../utils/validators");
const router = (0, express_1.Router)();
// Public
router.get('/', blogController_1.getBlogs);
router.get('/:slug', blogController_1.getBlog);
// Admin
router.get('/admin/all', auth_1.verifyToken, blogController_1.getAllBlogsAdmin);
router.post('/', auth_1.verifyToken, upload_1.uploadImage, validators_1.blogValidators, blogController_1.createBlog);
router.put('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), upload_1.uploadImage, validators_1.blogValidators, blogController_1.updateBlog);
router.delete('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), blogController_1.deleteBlog);
router.patch('/:id/publish', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), blogController_1.publishBlog);
router.patch('/:id/unpublish', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), blogController_1.unpublishBlog);
exports.default = router;
//# sourceMappingURL=blogs.js.map