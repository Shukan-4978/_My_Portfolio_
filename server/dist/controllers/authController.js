"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = exports.getMe = exports.refreshToken = exports.logout = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const Admin_1 = __importDefault(require("../models/Admin"));
const env_1 = require("../config/env");
const response_1 = require("../utils/response");
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: !env_1.env.isDev,
    sameSite: 'strict',
    path: '/',
};
const generateAccessToken = (id, email, role) => jsonwebtoken_1.default.sign({ id, email, role }, env_1.env.jwtSecret, {
    expiresIn: env_1.env.jwtExpiresIn,
});
const generateRefreshToken = (id) => jsonwebtoken_1.default.sign({ id }, env_1.env.jwtRefreshSecret, {
    expiresIn: env_1.env.jwtRefreshExpiresIn,
});
// POST /api/auth/login
const login = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
            return;
        }
        const { email, password } = req.body;
        const admin = await Admin_1.default.findOne({ email }).select('+passwordHash');
        if (!admin) {
            (0, response_1.errorResponse)(res, 'Invalid email or password', 401);
            return;
        }
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            (0, response_1.errorResponse)(res, 'Invalid email or password', 401);
            return;
        }
        const accessToken = generateAccessToken(admin._id.toString(), admin.email, admin.role);
        const refreshToken = generateRefreshToken(admin._id.toString());
        // Set tokens in httpOnly cookies
        res.cookie('accessToken', accessToken, {
            ...COOKIE_OPTIONS,
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        res.cookie('refreshToken', refreshToken, {
            ...COOKIE_OPTIONS,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        (0, response_1.successResponse)(res, {
            accessToken,
            admin: {
                id: admin._id,
                email: admin.email,
                role: admin.role,
            },
        }, 'Login successful');
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
// POST /api/auth/logout
const logout = (_req, res) => {
    res.clearCookie('accessToken', COOKIE_OPTIONS);
    res.clearCookie('refreshToken', COOKIE_OPTIONS);
    (0, response_1.successResponse)(res, null, 'Logged out successfully');
};
exports.logout = logout;
// POST /api/auth/refresh
const refreshToken = async (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken || req.body?.refreshToken;
        if (!token) {
            (0, response_1.errorResponse)(res, 'No refresh token provided', 401);
            return;
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwtRefreshSecret);
        }
        catch {
            (0, response_1.errorResponse)(res, 'Invalid or expired refresh token', 401);
            return;
        }
        const admin = await Admin_1.default.findById(decoded.id);
        if (!admin) {
            (0, response_1.errorResponse)(res, 'Admin not found', 401);
            return;
        }
        const accessToken = generateAccessToken(admin._id.toString(), admin.email, admin.role);
        res.cookie('accessToken', accessToken, {
            ...COOKIE_OPTIONS,
            maxAge: 15 * 60 * 1000,
        });
        (0, response_1.successResponse)(res, { accessToken }, 'Token refreshed successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.refreshToken = refreshToken;
// GET /api/auth/me
const getMe = async (req, res, next) => {
    try {
        const admin = await Admin_1.default.findById(req.admin?.id).select('-passwordHash');
        if (!admin) {
            (0, response_1.errorResponse)(res, 'Admin not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, admin, 'Admin retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
// POST /api/auth/seed (one-time setup)
const seedAdmin = async () => {
    try {
        const existing = await Admin_1.default.findOne({ email: env_1.env.adminEmail });
        if (existing) {
            console.log('✅ Admin already exists, skipping seed.');
            return;
        }
        const admin = new Admin_1.default({
            email: env_1.env.adminEmail,
            passwordHash: env_1.env.adminPassword, // will be hashed by pre-save hook
            role: 'super_admin',
        });
        await admin.save();
        console.log(`✅ Default admin seeded: ${env_1.env.adminEmail}`);
    }
    catch (error) {
        console.error('❌ Failed to seed admin:', error);
    }
};
exports.seedAdmin = seedAdmin;
//# sourceMappingURL=authController.js.map