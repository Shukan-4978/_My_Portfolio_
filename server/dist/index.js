"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const rateLimiter_1 = require("./middleware/rateLimiter");
const errorHandler_1 = require("./middleware/errorHandler");
const authController_1 = require("./controllers/authController");
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
// ─── Security Middleware ──────────────────────────────────────────────────────
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        const allowedOrigins = env_1.env.frontendUrl
            .split(',')
            .map((o) => o.trim())
            .filter(Boolean);
        // Allow requests with no origin (e.g., mobile apps, curl)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error(`CORS: Origin '${origin}' not allowed`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// ─── Request Logging ──────────────────────────────────────────────────────────
if (env_1.env.isDev) {
    app.use((0, morgan_1.default)('dev'));
}
else {
    app.use((0, morgan_1.default)('combined'));
}
// ─── Compression ──────────────────────────────────────────────────────────────
app.use((0, compression_1.default)());
// ─── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, cookie_parser_1.default)());
// ─── Trust Proxy (for rate limiting behind load balancers) ───────────────────
app.set('trust proxy', 1);
// ─── Global Rate Limiter ──────────────────────────────────────────────────────
app.use('/api', rateLimiter_1.generalLimiter);
// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api', index_1.default);
// ─── Root Route ───────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
    res.json({
        success: true,
        message: "Shukan Prajapati's Portfolio API",
        version: '1.0.0',
        docs: '/api/health',
    });
});
// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
// ─── Global Error Handler (must be last) ────────────────────────────────────
app.use((err, req, res, next) => {
    (0, errorHandler_1.errorHandler)(err, req, res, next);
});
// ─── Start Server ─────────────────────────────────────────────────────────────
const startServer = async () => {
    try {
        // Connect to MongoDB
        await (0, db_1.connectDB)();
        // Seed default admin if none exists
        await (0, authController_1.seedAdmin)();
        // Start listening
        const server = app.listen(env_1.env.port, () => {
            console.log(`\n🚀 Server running on port ${env_1.env.port}`);
            console.log(`   Environment : ${env_1.env.nodeEnv}`);
            console.log(`   API Base    : http://localhost:${env_1.env.port}/api`);
            console.log(`   Health      : http://localhost:${env_1.env.port}/api/health\n`);
        });
        // Graceful shutdown
        const gracefulShutdown = (signal) => {
            console.log(`\n📴 Received ${signal}. Shutting down gracefully...`);
            server.close(() => {
                console.log('HTTP server closed.');
                process.exit(0);
            });
        };
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        // Handle unhandled rejections
        process.on('unhandledRejection', (reason) => {
            console.error('❌ Unhandled Rejection:', reason);
            server.close(() => process.exit(1));
        });
        process.on('uncaughtException', (error) => {
            console.error('❌ Uncaught Exception:', error);
            process.exit(1);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
exports.default = app;
//# sourceMappingURL=index.js.map