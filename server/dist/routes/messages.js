"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const auth_1 = require("../middleware/auth");
const rateLimiter_1 = require("../middleware/rateLimiter");
const validators_1 = require("../utils/validators");
const router = (0, express_1.Router)();
// Public (rate-limited)
router.post('/', rateLimiter_1.contactLimiter, validators_1.contactValidators, messageController_1.sendMessage);
// Admin
router.get('/', auth_1.verifyToken, messageController_1.getMessages);
router.patch('/mark-all-read', auth_1.verifyToken, messageController_1.markAllRead);
router.patch('/:id/read', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), messageController_1.markRead);
router.delete('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), messageController_1.deleteMessage);
exports.default = router;
//# sourceMappingURL=messages.js.map