"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAchievement = exports.updateAchievement = exports.createAchievement = exports.getAchievement = exports.getAchievements = void 0;
const Achievement_1 = __importDefault(require("../models/Achievement"));
const response_1 = require("../utils/response");
// GET /api/achievements (public)
const getAchievements = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const type = req.query.type;
        const filter = {};
        if (type)
            filter.type = type;
        const [achievements, total] = await Promise.all([
            Achievement_1.default.find(filter).sort({ date: -1 }).skip(skip).limit(limit),
            Achievement_1.default.countDocuments(filter),
        ]);
        (0, response_1.successResponse)(res, (0, response_1.paginatedResponse)(achievements, total, page, limit), 'Achievements retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getAchievements = getAchievements;
// GET /api/achievements/:id (public)
const getAchievement = async (req, res, next) => {
    try {
        const achievement = await Achievement_1.default.findById(req.params.id);
        if (!achievement) {
            (0, response_1.errorResponse)(res, 'Achievement not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, achievement, 'Achievement retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getAchievement = getAchievement;
// POST /api/achievements (admin)
const createAchievement = async (req, res, next) => {
    try {
        const achievement = await Achievement_1.default.create(req.body);
        (0, response_1.successResponse)(res, achievement, 'Achievement created successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createAchievement = createAchievement;
// PUT /api/achievements/:id (admin)
const updateAchievement = async (req, res, next) => {
    try {
        const achievement = await Achievement_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!achievement) {
            (0, response_1.errorResponse)(res, 'Achievement not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, achievement, 'Achievement updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateAchievement = updateAchievement;
// DELETE /api/achievements/:id (admin)
const deleteAchievement = async (req, res, next) => {
    try {
        const achievement = await Achievement_1.default.findByIdAndDelete(req.params.id);
        if (!achievement) {
            (0, response_1.errorResponse)(res, 'Achievement not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, null, 'Achievement deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAchievement = deleteAchievement;
//# sourceMappingURL=achievementController.js.map