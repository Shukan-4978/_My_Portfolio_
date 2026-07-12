"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testimonialController_1 = require("../controllers/testimonialController");
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const validators_1 = require("../utils/validators");
const router = (0, express_1.Router)();
// Public
router.get('/', testimonialController_1.getTestimonials);
router.get('/:id', (0, validators_1.objectIdParam)('id'), testimonialController_1.getTestimonial);
// Admin
router.post('/', auth_1.verifyToken, upload_1.uploadImage, testimonialController_1.createTestimonial);
router.put('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), upload_1.uploadImage, testimonialController_1.updateTestimonial);
router.delete('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), testimonialController_1.deleteTestimonial);
exports.default = router;
//# sourceMappingURL=testimonials.js.map