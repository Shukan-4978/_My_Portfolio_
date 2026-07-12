"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceController_1 = require("../controllers/serviceController");
const auth_1 = require("../middleware/auth");
const validators_1 = require("../utils/validators");
const router = (0, express_1.Router)();
// Public
router.get('/', serviceController_1.getServices);
router.get('/:id', (0, validators_1.objectIdParam)('id'), serviceController_1.getService);
// Admin
router.post('/', auth_1.verifyToken, serviceController_1.createService);
router.put('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), serviceController_1.updateService);
router.delete('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), serviceController_1.deleteService);
router.patch('/order', auth_1.verifyToken, serviceController_1.updateOrder);
exports.default = router;
//# sourceMappingURL=services.js.map