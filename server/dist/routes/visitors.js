"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const visitorController_1 = require("../controllers/visitorController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public (track visits)
router.post('/track', visitorController_1.trackVisitor);
// Admin
router.get('/', auth_1.verifyToken, visitorController_1.getVisitors);
router.get('/analytics', auth_1.verifyToken, visitorController_1.getAnalytics);
exports.default = router;
//# sourceMappingURL=visitors.js.map