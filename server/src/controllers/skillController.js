"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.deleteSkill = exports.updateSkill = exports.createSkill = exports.getSkill = exports.getSkills = void 0;
const Skill_1 = __importDefault(require("../models/Skill"));
const response_1 = require("../utils/response");
// GET /api/skills (public)
const getSkills = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const category = req.query.category;
        const filter = {};
        if (category)
            filter.category = category;
        const [skills, total] = await Promise.all([
            Skill_1.default.find(filter).sort({ category: 1, order: 1 }).skip(skip).limit(limit),
            Skill_1.default.countDocuments(filter),
        ]);
        (0, response_1.successResponse)(res, (0, response_1.paginatedResponse)(skills, total, page, limit), 'Skills retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getSkills = getSkills;
// GET /api/skills/:id (public)
const getSkill = async (req, res, next) => {
    try {
        const skill = await Skill_1.default.findById(req.params.id);
        if (!skill) {
            (0, response_1.errorResponse)(res, 'Skill not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, skill, 'Skill retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getSkill = getSkill;
// POST /api/skills (admin)
const createSkill = async (req, res, next) => {
    try {
        const skill = await Skill_1.default.create(req.body);
        (0, response_1.successResponse)(res, skill, 'Skill created successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createSkill = createSkill;
// PUT /api/skills/:id (admin)
const updateSkill = async (req, res, next) => {
    try {
        const skill = await Skill_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!skill) {
            (0, response_1.errorResponse)(res, 'Skill not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, skill, 'Skill updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateSkill = updateSkill;
// DELETE /api/skills/:id (admin)
const deleteSkill = async (req, res, next) => {
    try {
        const skill = await Skill_1.default.findByIdAndDelete(req.params.id);
        if (!skill) {
            (0, response_1.errorResponse)(res, 'Skill not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, null, 'Skill deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteSkill = deleteSkill;
// PATCH /api/skills/order (admin)
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
        await Skill_1.default.bulkWrite(bulkOps);
        (0, response_1.successResponse)(res, null, 'Skill order updated');
    }
    catch (error) {
        next(error);
    }
};
exports.updateOrder = updateOrder;
//# sourceMappingURL=skillController.js.map