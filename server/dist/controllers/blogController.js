"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBlogsAdmin = exports.unpublishBlog = exports.publishBlog = exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlog = exports.getBlogs = void 0;
const express_validator_1 = require("express-validator");
const Blog_1 = __importDefault(require("../models/Blog"));
const cloudinary_1 = require("../config/cloudinary");
const response_1 = require("../utils/response");
// GET /api/blogs (public)
const getBlogs = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const tag = req.query.tag;
        const featured = req.query.featured === 'true';
        const filter = { draft: false };
        if (tag)
            filter.tags = tag;
        if (featured)
            filter.featured = true;
        const [blogs, total] = await Promise.all([
            Blog_1.default.find(filter)
                .select('-content')
                .sort({ featured: -1, publishedAt: -1 })
                .skip(skip)
                .limit(limit),
            Blog_1.default.countDocuments(filter),
        ]);
        (0, response_1.successResponse)(res, (0, response_1.paginatedResponse)(blogs, total, page, limit), 'Blogs retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getBlogs = getBlogs;
// GET /api/blogs/:slug (public)
const getBlog = async (req, res, next) => {
    try {
        const blog = await Blog_1.default.findOne({ slug: req.params.slug, draft: false });
        if (!blog) {
            (0, response_1.errorResponse)(res, 'Blog not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, blog, 'Blog retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getBlog = getBlog;
// POST /api/blogs (admin)
const createBlog = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
            return;
        }
        const file = req.file;
        const coverImage = file?.path;
        const blog = await Blog_1.default.create({
            ...req.body,
            ...(coverImage ? { coverImage } : {}),
        });
        (0, response_1.successResponse)(res, blog, 'Blog created successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createBlog = createBlog;
// PUT /api/blogs/:id (admin)
const updateBlog = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
            return;
        }
        const file = req.file;
        const updateData = { ...req.body };
        if (file?.path)
            updateData.coverImage = file.path;
        const blog = await Blog_1.default.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!blog) {
            (0, response_1.errorResponse)(res, 'Blog not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, blog, 'Blog updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateBlog = updateBlog;
// DELETE /api/blogs/:id (admin)
const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog_1.default.findById(req.params.id);
        if (!blog) {
            (0, response_1.errorResponse)(res, 'Blog not found', 404);
            return;
        }
        // Clean up cover image from Cloudinary if it exists
        if (blog.coverImage) {
            // Extract public_id from Cloudinary URL
            const parts = blog.coverImage.split('/');
            const fileName = parts[parts.length - 1];
            const publicId = `portfolio/${fileName.split('.')[0]}`;
            await cloudinary_1.cloudinary.uploader.destroy(publicId).catch(() => null);
        }
        await blog.deleteOne();
        (0, response_1.successResponse)(res, null, 'Blog deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBlog = deleteBlog;
// PATCH /api/blogs/:id/publish (admin)
const publishBlog = async (req, res, next) => {
    try {
        const blog = await Blog_1.default.findByIdAndUpdate(req.params.id, { draft: false, publishedAt: new Date() }, { new: true });
        if (!blog) {
            (0, response_1.errorResponse)(res, 'Blog not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, blog, 'Blog published successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.publishBlog = publishBlog;
// PATCH /api/blogs/:id/unpublish (admin)
const unpublishBlog = async (req, res, next) => {
    try {
        const blog = await Blog_1.default.findByIdAndUpdate(req.params.id, { draft: true }, { new: true });
        if (!blog) {
            (0, response_1.errorResponse)(res, 'Blog not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, blog, 'Blog unpublished successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.unpublishBlog = unpublishBlog;
// GET /api/blogs/admin/all (admin - includes drafts)
const getAllBlogsAdmin = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const [blogs, total] = await Promise.all([
            Blog_1.default.find()
                .select('-content')
                .sort({ updatedAt: -1 })
                .skip(skip)
                .limit(limit),
            Blog_1.default.countDocuments(),
        ]);
        (0, response_1.successResponse)(res, (0, response_1.paginatedResponse)(blogs, total, page, limit), 'All blogs retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getAllBlogsAdmin = getAllBlogsAdmin;
//# sourceMappingURL=blogController.js.map