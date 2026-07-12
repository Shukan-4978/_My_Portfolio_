"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.deleteCertificate = exports.updateCertificate = exports.createCertificate = exports.getCertificate = exports.getCertificates = void 0;
const Certificate_1 = __importDefault(require("../models/Certificate"));
const response_1 = require("../utils/response");
// GET /api/certificates (public)
const getCertificates = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const [certificates, total] = await Promise.all([
            Certificate_1.default.find()
                .sort({ order: 1, date: -1 })
                .skip(skip)
                .limit(limit),
            Certificate_1.default.countDocuments(),
        ]);
        (0, response_1.successResponse)(res, (0, response_1.paginatedResponse)(certificates, total, page, limit), 'Certificates retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getCertificates = getCertificates;
// GET /api/certificates/:id (public)
const getCertificate = async (req, res, next) => {
    try {
        const certificate = await Certificate_1.default.findById(req.params.id);
        if (!certificate) {
            (0, response_1.errorResponse)(res, 'Certificate not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, certificate, 'Certificate retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getCertificate = getCertificate;
// POST /api/certificates (admin)
const createCertificate = async (req, res, next) => {
    try {
        const file = req.file;
        const imageUrl = file?.path;
        const certificate = await Certificate_1.default.create({
            ...req.body,
            ...(imageUrl ? { image: imageUrl } : {}),
        });
        (0, response_1.successResponse)(res, certificate, 'Certificate created successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createCertificate = createCertificate;
// PUT /api/certificates/:id (admin)
const updateCertificate = async (req, res, next) => {
    try {
        const file = req.file;
        const updateData = { ...req.body };
        if (file?.path)
            updateData.image = file.path;
        const certificate = await Certificate_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!certificate) {
            (0, response_1.errorResponse)(res, 'Certificate not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, certificate, 'Certificate updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateCertificate = updateCertificate;
// DELETE /api/certificates/:id (admin)
const deleteCertificate = async (req, res, next) => {
    try {
        const certificate = await Certificate_1.default.findByIdAndDelete(req.params.id);
        if (!certificate) {
            (0, response_1.errorResponse)(res, 'Certificate not found', 404);
            return;
        }
        (0, response_1.successResponse)(res, null, 'Certificate deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCertificate = deleteCertificate;
// PATCH /api/certificates/order (admin)
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
        await Certificate_1.default.bulkWrite(bulkOps);
        (0, response_1.successResponse)(res, null, 'Certificate order updated');
    }
    catch (error) {
        next(error);
    }
};
exports.updateOrder = updateOrder;
//# sourceMappingURL=certificateController.js.map