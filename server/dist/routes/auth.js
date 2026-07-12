"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const rateLimiter_1 = require("../middleware/rateLimiter");
const validators_1 = require("../utils/validators");
const router = (0, express_1.Router)();
// Public routes
router.post('/login', rateLimiter_1.authLimiter, validators_1.loginValidators, authController_1.login);
router.post('/logout', authController_1.logout);
router.post('/refresh', authController_1.refreshToken);
// Protected routes
router.get('/me', auth_1.verifyToken, authController_1.getMe);
exports.default = router;
//# sourceMappingURL=auth.js.map