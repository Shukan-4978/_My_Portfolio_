"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const achievementController_1 = require("../controllers/achievementController");
const auth_1 = require("../middleware/auth");
const validators_1 = require("../utils/validators");
const router = (0, express_1.Router)();
// Public
router.get('/', achievementController_1.getAchievements);
router.get('/:id', (0, validators_1.objectIdParam)('id'), achievementController_1.getAchievement);
// Admin
router.post('/', auth_1.verifyToken, achievementController_1.createAchievement);
router.put('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), achievementController_1.updateAchievement);
router.delete('/:id', auth_1.verifyToken, (0, validators_1.objectIdParam)('id'), achievementController_1.deleteAchievement);
exports.default = router;
//# sourceMappingURL=achievements.js.map