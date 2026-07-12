"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatedResponse = exports.errorResponse = exports.successResponse = void 0;
/**
 * Send a standardized success response
 */
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
exports.successResponse = successResponse;
/**
 * Send a standardized error response
 */
const errorResponse = (res, message = 'An error occurred', statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorResponse = errorResponse;
/**
 * Build a paginated response payload
 */
const paginatedResponse = (items, total, page, limit) => {
    const totalPages = Math.ceil(total / limit);
    return {
        items,
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
    };
};
exports.paginatedResponse = paginatedResponse;
//# sourceMappingURL=response.js.map