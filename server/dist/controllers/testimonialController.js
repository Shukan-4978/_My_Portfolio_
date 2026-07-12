"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTestimonial = exports.updateTestimonial = exports.createTestimonial = exports.getTestimonial = exports.getTestimonials = void 0;
const Testimonial_1 = __importDefault(require("../models/Testimonial"));
const response_1 = require("../utils/response");
// GET /api/testimonials (public)
const getTestimonials = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const [testimonials, total] = await Promise.all([
            Testimonial_1.default.find().sort({ rating: -1, createdAt: -1 }).skip(skip).limit(limit),
            Testimonial_1.default.countDocuments(),
        ]);
        (0, response_1.successResponse)(res, (0, response_1.paginatedResponse)(testimonials, total, page, limit), 'Testimonials retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getTestimonials = getTestimonials;
// GET /api/testimonials/:id (public)
const getTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial_1.default.findById(req.params.id);
        if (!testimonial) {
            (0, response_1.errorResponse)(res, 'Testimonial not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, testimonial, 'Testimonial retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getTestimonial = getTestimonial;
// POST /api/testimonials (admin)
const createTestimonial = async (req, res, next) => {
    try {
        const file = req.file;
        const testimonial = await Testimonial_1.default.create({
            ...req.body,
            ...(file?.path ? { avatar: file.path } : {}),
        });
        (0, response_1.successResponse)(res, testimonial, 'Testimonial created successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createTestimonial = createTestimonial;
// PUT /api/testimonials/:id (admin)
const updateTestimonial = async (req, res, next) => {
    try {
        const file = req.file;
        const updateData = { ...req.body };
        if (file?.path)
            updateData.avatar = file.path;
        const testimonial = await Testimonial_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!testimonial) {
            (0, response_1.errorResponse)(res, 'Testimonial not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, testimonial, 'Testimonial updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateTestimonial = updateTestimonial;
// DELETE /api/testimonials/:id (admin)
const deleteTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial_1.default.findByIdAndDelete(req.params.id);
        if (!testimonial) {
            (0, response_1.errorResponse)(res, 'Testimonial not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, null, 'Testimonial deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTestimonial = deleteTestimonial;
//# sourceMappingURL=testimonialController.js.map