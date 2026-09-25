"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationValidators = exports.objectIdParam = exports.blogValidators = exports.projectValidators = exports.contactValidators = exports.loginValidators = void 0;
const express_validator_1 = require("express-validator");
// ─── Auth ─────────────────────────────────────────────────────────────────────
exports.loginValidators = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];
// ─── Contact / Message ────────────────────────────────────────────────────────
exports.contactValidators = [
    (0, express_validator_1.body)('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 100 })
        .withMessage('Name cannot exceed 100 characters'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    (0, express_validator_1.body)('subject')
        .trim()
        .notEmpty()
        .withMessage('Subject is required')
        .isLength({ max: 200 })
        .withMessage('Subject cannot exceed 200 characters'),
    (0, express_validator_1.body)('message')
        .trim()
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ min: 10, max: 2000 })
        .withMessage('Message must be between 10 and 2000 characters'),
];
// ─── Project ──────────────────────────────────────────────────────────────────
exports.projectValidators = [
    (0, express_validator_1.body)('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 150 })
        .withMessage('Title cannot exceed 150 characters'),
    (0, express_validator_1.body)('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),
    (0, express_validator_1.body)('techStack')
        .isArray({ min: 1 })
        .withMessage('Tech stack must be a non-empty array'),
    (0, express_validator_1.body)('techStack.*')
        .trim()
        .notEmpty()
        .withMessage('Each tech stack item must be a non-empty string'),
    (0, express_validator_1.body)('github')
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage('GitHub must be a valid URL'),
    (0, express_validator_1.body)('live')
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage('Live URL must be a valid URL'),
    (0, express_validator_1.body)('featured')
        .optional()
        .isBoolean()
        .withMessage('Featured must be a boolean'),
    (0, express_validator_1.body)('order')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Order must be a non-negative integer'),
];
// ─── Blog ─────────────────────────────────────────────────────────────────────
exports.blogValidators = [
    (0, express_validator_1.body)('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 200 })
        .withMessage('Title cannot exceed 200 characters'),
    (0, express_validator_1.body)('excerpt')
        .trim()
        .notEmpty()
        .withMessage('Excerpt is required')
        .isLength({ max: 500 })
        .withMessage('Excerpt cannot exceed 500 characters'),
    (0, express_validator_1.body)('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required'),
    (0, express_validator_1.body)('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array'),
    (0, express_validator_1.body)('tags.*')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Each tag must be a non-empty string'),
    (0, express_validator_1.body)('readTime')
        .isInt({ min: 1 })
        .withMessage('Read time must be a positive integer (minutes)'),
    (0, express_validator_1.body)('featured')
        .optional()
        .isBoolean()
        .withMessage('Featured must be a boolean'),
    (0, express_validator_1.body)('draft')
        .optional()
        .isBoolean()
        .withMessage('Draft must be a boolean'),
];
// ─── Common param validators ──────────────────────────────────────────────────
const objectIdParam = (paramName = 'id') => (0, express_validator_1.param)(paramName)
    .isMongoId()
    .withMessage(`Invalid ${paramName} — must be a valid MongoDB ObjectId`);
exports.objectIdParam = objectIdParam;
exports.paginationValidators = [
    (0, express_validator_1.query)('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    (0, express_validator_1.query)('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
];
//# sourceMappingURL=validators.js.map