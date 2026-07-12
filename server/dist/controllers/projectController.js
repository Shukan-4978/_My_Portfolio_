"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.deleteProject = exports.updateProject = exports.createProject = exports.getProject = exports.getProjects = void 0;
const express_validator_1 = require("express-validator");
const Project_1 = __importDefault(require("../models/Project"));
const cloudinary_1 = require("../config/cloudinary");
const response_1 = require("../utils/response");
// GET /api/projects (public)
const getProjects = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const featured = req.query.featured === 'true';
        const category = req.query.category;
        const filter = {};
        if (featured)
            filter.featured = true;
        if (category)
            filter.category = category;
        const [projects, total] = await Promise.all([
            Project_1.default.find(filter)
                .sort({ featured: -1, order: 1, createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Project_1.default.countDocuments(filter),
        ]);
        (0, response_1.successResponse)(res, (0, response_1.paginatedResponse)(projects, total, page, limit), 'Projects retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getProjects = getProjects;
// GET /api/projects/:id (public)
const getProject = async (req, res, next) => {
    try {
        const project = await Project_1.default.findById(req.params.id);
        if (!project) {
            (0, response_1.errorResponse)(res, 'Project not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, project, 'Project retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getProject = getProject;
// POST /api/projects (admin)
const createProject = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
            return;
        }
        const files = req.files;
        const images = files?.map((file) => ({
            url: file.path,
            publicId: file.filename,
        })) ?? [];
        const project = await Project_1.default.create({ ...req.body, images });
        (0, response_1.successResponse)(res, project, 'Project created successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createProject = createProject;
// PUT /api/projects/:id (admin)
const updateProject = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
            return;
        }
        const files = req.files;
        const updateData = { ...req.body };
        if (files && files.length > 0) {
            const newImages = files.map((file) => ({
                url: file.path,
                publicId: file.filename,
            }));
            updateData.images = newImages;
        }
        const project = await Project_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!project) {
            (0, response_1.errorResponse)(res, 'Project not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, project, 'Project updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateProject = updateProject;
// DELETE /api/projects/:id (admin)
const deleteProject = async (req, res, next) => {
    try {
        const project = await Project_1.default.findById(req.params.id);
        if (!project) {
            (0, response_1.errorResponse)(res, 'Project not found', 404);
            return;
        }
        // Delete images from Cloudinary
        const deletePromises = project.images.map((img) => cloudinary_1.cloudinary.uploader.destroy(img.publicId));
        await Promise.allSettled(deletePromises);
        await project.deleteOne();
        (0, response_1.successResponse)(res, null, 'Project deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProject = deleteProject;
// PATCH /api/projects/order (admin) — drag-and-drop reordering
const updateOrder = async (req, res, next) => {
    try {
        const { items } = req.body;
        if (!Array.isArray(items) || items.length === 0) {
            (0, response_1.errorResponse)(res, 'Items array is required', 400);
            return;
        }
        const bulkOps = items.map(({ id, order }) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { order } },
            },
        }));
        await Project_1.default.bulkWrite(bulkOps);
        (0, response_1.successResponse)(res, null, 'Project order updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateOrder = updateOrder;
//# sourceMappingURL=projectController.js.map