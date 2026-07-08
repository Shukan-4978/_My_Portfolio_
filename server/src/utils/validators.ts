import { body, param, query } from 'express-validator';

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const loginValidators = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

// ─── Contact / Message ────────────────────────────────────────────────────────

export const contactValidators = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ max: 200 })
    .withMessage('Subject cannot exceed 200 characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
];

// ─── Project ──────────────────────────────────────────────────────────────────

export const projectValidators = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 150 })
    .withMessage('Title cannot exceed 150 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('techStack')
    .isArray({ min: 1 })
    .withMessage('Tech stack must be a non-empty array'),
  body('techStack.*')
    .trim()
    .notEmpty()
    .withMessage('Each tech stack item must be a non-empty string'),
  body('github')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('GitHub must be a valid URL'),
  body('live')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Live URL must be a valid URL'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),
];

// ─── Blog ─────────────────────────────────────────────────────────────────────

export const blogValidators = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('excerpt')
    .trim()
    .notEmpty()
    .withMessage('Excerpt is required')
    .isLength({ max: 500 })
    .withMessage('Excerpt cannot exceed 500 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Each tag must be a non-empty string'),
  body('readTime')
    .isInt({ min: 1 })
    .withMessage('Read time must be a positive integer (minutes)'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  body('draft')
    .optional()
    .isBoolean()
    .withMessage('Draft must be a boolean'),
];

// ─── Common param validators ──────────────────────────────────────────────────

export const objectIdParam = (paramName = 'id') =>
  param(paramName)
    .isMongoId()
    .withMessage(`Invalid ${paramName} — must be a valid MongoDB ObjectId`);

export const paginationValidators = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];
