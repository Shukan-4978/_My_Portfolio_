"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../config/env");
const errorHandler = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    let statusCode = err.statusCode ?? 500;
    let message = err.message ?? 'Internal Server Error';
    // Mongoose Validation Error
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        const errors = Object.values(err.errors).map((e) => e.message);
        message = errors.join(', ');
    }
    // Mongoose CastError (invalid ObjectId)
    if (err instanceof mongoose_1.default.Error.CastError) {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }
    // MongoDB Duplicate Key Error
    if (err.code === 11000 && err.keyValue) {
        statusCode = 409;
        const field = Object.keys(err.keyValue)[0];
        message = `Duplicate value for field: ${field}. Please use a different value.`;
    }
    // JWT Errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token. Please login again.';
    }
    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token has expired. Please login again.';
    }
    // Multer Errors
    if (err.name === 'MulterError') {
        statusCode = 400;
        message = `File upload error: ${err.message}`;
    }
    const response = {
        success: false,
        message,
    };
    // Include stack trace only in development
    if (env_1.env.isDev) {
        response.stack = err.stack;
    }
    res.status(statusCode).json(response);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map