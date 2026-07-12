"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const certificateController_1 = require("../controllers/certificateController");
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const validators_1 = require("../utils/validators");
const router = (0, express_1.Router)();
// Public
router.get('/', certificateController_1.getCertificates);
router.get('/:id', (0, validators_1.objectIdParam)('id'), certificateController_1.getCertificate);
// Admin
router.post('/', auth_1.verifyToken, upload_1.uploadImage, certificateController_1.createCertificate);
router.put('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), upload_1.uploadImage, certificateController_1.updateCertificate);
router.delete('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), certificateController_1.deleteCertificate);
router.patch('/order', auth_1.verifyToken, certificateController_1.updateOrder);
exports.default = router;
//# sourceMappingURL=certificates.js.map