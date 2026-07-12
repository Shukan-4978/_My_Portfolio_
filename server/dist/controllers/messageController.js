"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.markAllRead = exports.markRead = exports.getMessages = exports.sendMessage = void 0;
const express_validator_1 = require("express-validator");
const Message_1 = __importDefault(require("../models/Message"));
const response_1 = require("../utils/response");
// POST /api/messages (public, rate-limited)
const sendMessage = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array(),
            });
            return;
        }
        const { name, email, subject, message } = req.body;
        const newMessage = await Message_1.default.create({ name, email, subject, message });
        (0, response_1.successResponse)(res, { id: newMessage._id }, 'Message sent successfully! I will get back to you soon.', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.sendMessage = sendMessage;
// GET /api/messages (admin)
const getMessages = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const readFilter = req.query.read;
        const filter = {};
        if (readFilter === 'true')
            filter.read = true;
        if (readFilter === 'false')
            filter.read = false;
        const [messages, total] = await Promise.all([
            Message_1.default.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Message_1.default.countDocuments(filter),
        ]);
        const unreadCount = await Message_1.default.countDocuments({ read: false });
        (0, response_1.successResponse)(res, { ...(0, response_1.paginatedResponse)(messages, total, page, limit), unreadCount }, 'Messages retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getMessages = getMessages;
// PATCH /api/messages/:id/read (admin)
const markRead = async (req, res, next) => {
    try {
        const message = await Message_1.default.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        if (!message) {
            (0, response_1.errorResponse)(res, 'Message not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, message, 'Message marked as read');
    }
    catch (error) {
        next(error);
    }
};
exports.markRead = markRead;
// PATCH /api/messages/mark-all-read (admin)
const markAllRead = async (_req, res, next) => {
    try {
        await Message_1.default.updateMany({ read: false }, { read: true });
        (0, response_1.successResponse)(res, null, 'All messages marked as read');
    }
    catch (error) {
        next(error);
    }
};
exports.markAllRead = markAllRead;
// DELETE /api/messages/:id (admin)
const deleteMessage = async (req, res, next) => {
    try {
        const message = await Message_1.default.findByIdAndDelete(req.params.id);
        if (!message) {
            (0, response_1.errorResponse)(res, 'Message not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, null, 'Message deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteMessage = deleteMessage;
//# sourceMappingURL=messageController.js.map