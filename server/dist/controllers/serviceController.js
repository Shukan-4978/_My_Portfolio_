"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.deleteService = exports.updateService = exports.createService = exports.getService = exports.getServices = void 0;
const Service_1 = __importDefault(require("../models/Service"));
const response_1 = require("../utils/response");
// GET /api/services (public)
const getServices = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const [services, total] = await Promise.all([
            Service_1.default.find().sort({ order: 1 }).skip(skip).limit(limit),
            Service_1.default.countDocuments(),
        ]);
        (0, response_1.successResponse)(res, (0, response_1.paginatedResponse)(services, total, page, limit), 'Services retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getServices = getServices;
// GET /api/services/:id (public)
const getService = async (req, res, next) => {
    try {
        const service = await Service_1.default.findById(req.params.id);
        if (!service) {
            (0, response_1.errorResponse)(res, 'Service not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, service, 'Service retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getService = getService;
// POST /api/services (admin)
const createService = async (req, res, next) => {
    try {
        const service = await Service_1.default.create(req.body);
        (0, response_1.successResponse)(res, service, 'Service created successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createService = createService;
// PUT /api/services/:id (admin)
const updateService = async (req, res, next) => {
    try {
        const service = await Service_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!service) {
            (0, response_1.errorResponse)(res, 'Service not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, service, 'Service updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateService = updateService;
// DELETE /api/services/:id (admin)
const deleteService = async (req, res, next) => {
    try {
        const service = await Service_1.default.findByIdAndDelete(req.params.id);
        if (!service) {
            (0, response_1.errorResponse)(res, 'Service not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, null, 'Service deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteService = deleteService;
// PATCH /api/services/order (admin)
const updateOrder = async (req, res, next) => {
    try {
        const { items } = req.body;
        if (!Array.isArray(items) || items.length === 0) {
            (0, response_1.errorResponse)(res, 'Items array is required', 400);
            return;
        }
        const bulkOps = items.map(({ id, order }) => ({
            updateOne: { filter: { _id: id }, update: { $set: { order } } },
        }));
        await Service_1.default.bulkWrite(bulkOps);
        (0, response_1.successResponse)(res, null, 'Service order updated');
    }
    catch (error) {
        next(error);
    }
};
exports.updateOrder = updateOrder;
//# sourceMappingURL=serviceController.js.map