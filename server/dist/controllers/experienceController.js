"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.deleteExperience = exports.updateExperience = exports.createExperience = exports.getExperience = exports.getExperiences = void 0;
const Experience_1 = __importDefault(require("../models/Experience"));
const response_1 = require("../utils/response");
// GET /api/experience (public)
const getExperiences = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const [experiences, total] = await Promise.all([
            Experience_1.default.find()
                .sort({ current: -1, startDate: -1, order: 1 })
                .skip(skip)
                .limit(limit),
            Experience_1.default.countDocuments(),
        ]);
        (0, response_1.successResponse)(res, (0, response_1.paginatedResponse)(experiences, total, page, limit), 'Experiences retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getExperiences = getExperiences;
// GET /api/experience/:id (public)
const getExperience = async (req, res, next) => {
    try {
        const experience = await Experience_1.default.findById(req.params.id);
        if (!experience) {
            (0, response_1.errorResponse)(res, 'Experience not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, experience, 'Experience retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getExperience = getExperience;
// POST /api/experience (admin)
const createExperience = async (req, res, next) => {
    try {
        const experience = await Experience_1.default.create(req.body);
        (0, response_1.successResponse)(res, experience, 'Experience created successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createExperience = createExperience;
// PUT /api/experience/:id (admin)
const updateExperience = async (req, res, next) => {
    try {
        const experience = await Experience_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!experience) {
            (0, response_1.errorResponse)(res, 'Experience not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, experience, 'Experience updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateExperience = updateExperience;
// DELETE /api/experience/:id (admin)
const deleteExperience = async (req, res, next) => {
    try {
        const experience = await Experience_1.default.findByIdAndDelete(req.params.id);
        if (!experience) {
            (0, response_1.errorResponse)(res, 'Experience not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, null, 'Experience deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteExperience = deleteExperience;
// PATCH /api/experience/order (admin)
const updateOrder = async (req, res, next) => {
    try {
        const { items } = req.body;
        if (!Array.isArray(items) || items.length === 0) {
            (0, response_1.errorResponse)(res, 'Items array is required', 400);
            return;
        }
        const bulkOps = items.map(({ id, order }) => ({
            updateOne: { filter: { _id: id }, update: { $set: { order } } },
        }));
        await Experience_1.default.bulkWrite(bulkOps);
        (0, response_1.successResponse)(res, null, 'Experience order updated');
    }
    catch (error) {
        next(error);
    }
};
exports.updateOrder = updateOrder;
//# sourceMappingURL=experienceController.js.map