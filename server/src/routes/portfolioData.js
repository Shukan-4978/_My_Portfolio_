"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolioDataController_1 = require("../controllers/portfolioDataController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public
router.get('/', portfolioDataController_1.getAllData);
router.get('/:key', portfolioDataController_1.getData);
// Admin
router.put('/:key', auth_1.verifyToken, portfolioDataController_1.updateData);
router.delete('/:key', auth_1.verifyToken, portfolioDataController_1.deleteData);
exports.default = router;
//# sourceMappingURL=portfolioData.js.map