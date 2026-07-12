"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const skillController_1 = require("../controllers/skillController");
const auth_1 = require("../middleware/auth");
const validators_1 = require("../utils/validators");
const router = (0, express_1.Router)();
// Public
router.get('/', skillController_1.getSkills);
router.get('/:id', (0, validators_1.objectIdParam)('id'), skillController_1.getSkill);
// Admin
router.post('/', auth_1.verifyToken, skillController_1.createSkill);
router.put('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), skillController_1.updateSkill);
router.delete('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), skillController_1.deleteSkill);
router.patch('/order', auth_1.verifyToken, skillController_1.updateOrder);
exports.default = router;
//# sourceMappingURL=skills.js.map