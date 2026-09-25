"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = exports.getVisitors = exports.trackVisitor = void 0;
const Visitor_1 = __importDefault(require("../models/Visitor"));
const response_1 = require("../utils/response");
// Middleware: POST /api/visitors/track (public)
const trackVisitor = async (req, res, next) => {
    try {
        const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() ||
            req.socket.remoteAddress ||
            'unknown';
        const page = req.body.page || req.headers.referer || '/';
        const userAgent = req.headers['user-agent'] || 'unknown';
        const country = req.headers['cf-ipcountry'] || undefined;
        await Visitor_1.default.create({
            ip,
            page,
            userAgent,
            timestamp: new Date(),
            ...(country ? { country } : {}),
        });
        (0, response_1.successResponse)(res, null, 'Visitor tracked', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.trackVisitor = trackVisitor;
// GET /api/visitors (admin)
const getVisitors = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const [visitors, total] = await Promise.all([
            Visitor_1.default.find().sort({ timestamp: -1 }).skip(skip).limit(limit),
            Visitor_1.default.countDocuments(),
        ]);
        (0, response_1.successResponse)(res, (0, response_1.paginatedResponse)(visitors, total, page, limit), 'Visitors retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getVisitors = getVisitors;
// GET /api/visitors/analytics (admin)
const getAnalytics = async (_req, res, next) => {
    try {
        const now = new Date();
        const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const [totalVisits, visitsLast30Days, visitsLast7Days, visitsToday, topPages, topCountries, visitsByDay, uniqueIPs,] = await Promise.all([
            Visitor_1.default.countDocuments(),
            Visitor_1.default.countDocuments({ timestamp: { $gte: last30Days } }),
            Visitor_1.default.countDocuments({ timestamp: { $gte: last7Days } }),
            Visitor_1.default.countDocuments({ timestamp: { $gte: today } }),
            Visitor_1.default.aggregate([
                { $group: { _id: '$page', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 },
                { $project: { page: '$_id', count: 1, _id: 0 } },
            ]),
            Visitor_1.default.aggregate([
                { $match: { country: { $exists: true, $ne: null } } },
                { $group: { _id: '$country', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 },
                { $project: { country: '$_id', count: 1, _id: 0 } },
            ]),
            Visitor_1.default.aggregate([
                { $match: { timestamp: { $gte: last30Days } } },
                {
                    $group: {
                        _id: {
                            year: { $year: '$timestamp' },
                            month: { $month: '$timestamp' },
                            day: { $dayOfMonth: '$timestamp' },
                        },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
                {
                    $project: {
                        date: {
                            $dateToString: {
                                format: '%Y-%m-%d',
                                date: {
                                    $dateFromParts: {
                                        year: '$_id.year',
                                        month: '$_id.month',
                                        day: '$_id.day',
                                    },
                                },
                            },
                        },
                        count: 1,
                        _id: 0,
                    },
                },
            ]),
            Visitor_1.default.distinct('ip').then((ips) => ips.length),
        ]);
        (0, response_1.successResponse)(res, {
            overview: {
                totalVisits,
                uniqueVisitors: uniqueIPs,
                visitsLast30Days,
                visitsLast7Days,
                visitsToday,
            },
            topPages,
            topCountries,
            visitsByDay,
        }, 'Analytics retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getAnalytics = getAnalytics;
//# sourceMappingURL=visitorController.js.map