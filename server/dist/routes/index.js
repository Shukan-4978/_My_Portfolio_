"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const projects_1 = __importDefault(require("./projects"));
const skills_1 = __importDefault(require("./skills"));
const experience_1 = __importDefault(require("./experience"));
const certificates_1 = __importDefault(require("./certificates"));
const achievements_1 = __importDefault(require("./achievements"));
const blogs_1 = __importDefault(require("./blogs"));
const messages_1 = __importDefault(require("./messages"));
const portfolioData_1 = __importDefault(require("./portfolioData"));
const visitors_1 = __importDefault(require("./visitors"));
const upload_1 = __importDefault(require("./upload"));
const router = (0, express_1.Router)();
// Health check
router.get('/health', (_req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
    });
});
// Mount all routes
router.use('/auth', auth_1.default);
router.use('/projects', projects_1.default);
router.use('/skills', skills_1.default);
router.use('/experience', experience_1.default);
router.use('/certificates', certificates_1.default);
router.use('/achievements', achievements_1.default);
router.use('/blogs', blogs_1.default);
router.use('/messages', messages_1.default);
router.use('/portfolio', portfolioData_1.default);
router.use('/visitors', visitors_1.default);
router.use('/upload', upload_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map