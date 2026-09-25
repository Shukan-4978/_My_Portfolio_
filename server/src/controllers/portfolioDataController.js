"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.updateData = exports.getAllData = exports.getData = void 0;
const PortfolioData_1 = __importDefault(require("../models/PortfolioData"));
const response_1 = require("../utils/response");
// GET /api/portfolio/:key (public)
const getData = async (req, res, next) => {
    try {
        const { key } = req.params;
        const data = await PortfolioData_1.default.findOne({ key: key.toLowerCase() });
        if (!data) {
            (0, response_1.errorResponse)(res, `Portfolio data for key '${key}' not found`, 404);
            return;
        }
        (0, response_1.successResponse)(res, data, 'Portfolio data retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getData = getData;
// GET /api/portfolio (public) - get all keys
const getAllData = async (_req, res, next) => {
    try {
        const data = await PortfolioData_1.default.find().sort({ key: 1 });
        (0, response_1.successResponse)(res, data, 'All portfolio data retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getAllData = getAllData;
// PUT /api/portfolio/:key (admin) - upsert
const updateData = async (req, res, next) => {
    try {
        const { key } = req.params;
        const { value } = req.body;
        if (value === undefined || value === null) {
            (0, response_1.errorResponse)(res, 'Value is required in request body', 400);
            return;
        }
        const data = await PortfolioData_1.default.findOneAndUpdate({ key: key.toLowerCase() }, { key: key.toLowerCase(), value }, { new: true, upsert: true, runValidators: true });
        (0, response_1.successResponse)(res, data, `Portfolio data for '${key}' updated successfully`);
    }
    catch (error) {
        next(error);
    }
};
exports.updateData = updateData;
// DELETE /api/portfolio/:key (admin)
const deleteData = async (req, res, next) => {
    try {
        const { key } = req.params;
        const data = await PortfolioData_1.default.findOneAndDelete({ key: key.toLowerCase() });
        if (!data) {
            (0, response_1.errorResponse)(res, `Portfolio data for key '${key}' not found`, 404);
            return;
        }
        (0, response_1.successResponse)(res, null, `Portfolio data for '${key}' deleted successfully`);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteData = deleteData;
//# sourceMappingURL=portfolioDataController.js.map