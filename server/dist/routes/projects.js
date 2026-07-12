"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controllers/projectController");
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const validators_1 = require("../utils/validators");
const router = (0, express_1.Router)();
// Public
router.get('/', projectController_1.getProjects);
router.get('/:id', (0, validators_1.objectIdParam)('id'), projectController_1.getProject);
// Admin
router.post('/', auth_1.verifyToken, upload_1.uploadMultiple, validators_1.projectValidators, projectController_1.createProject);
router.put('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), upload_1.uploadMultiple, validators_1.projectValidators, projectController_1.updateProject);
router.delete('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), projectController_1.deleteProject);
router.patch('/order', auth_1.verifyToken, projectController_1.updateOrder);
exports.default = router;
//# sourceMappingURL=projects.js.map