"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const experienceController_1 = require("../controllers/experienceController");
const auth_1 = require("../middleware/auth");
const validators_1 = require("../utils/validators");
const router = (0, express_1.Router)();
// Public
router.get('/', experienceController_1.getExperiences);
router.get('/:id', (0, validators_1.objectIdParam)('id'), experienceController_1.getExperience);
// Admin
router.post('/', auth_1.verifyToken, experienceController_1.createExperience);
router.put('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), experienceController_1.updateExperience);
router.delete('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), experienceController_1.deleteExperience);
router.patch('/order', auth_1.verifyToken, experienceController_1.updateOrder);
exports.default = router;
//# sourceMappingURL=experience.js.map