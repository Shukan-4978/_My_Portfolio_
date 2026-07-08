import { Request, Response, NextFunction } from 'express';
import Visitor from '../models/Visitor';
import { successResponse, paginatedResponse } from '../utils/response';

// Middleware: POST /api/visitors/track (public)
export const trackVisitor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown';

    const page = (req.body.page as string) || req.headers.referer || '/';
    const userAgent = req.headers['user-agent'] || 'unknown';
    const country = (req.headers['cf-ipcountry'] as string) || undefined;

    await Visitor.create({
      ip,
      page,
      userAgent,
      timestamp: new Date(),
      ...(country ? { country } : {}),
    });

    successResponse(res, null, 'Visitor tracked', 201);
  } catch (error) {
    next(error);
  }
};

// GET /api/visitors (admin)
export const getVisitors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    const [visitors, total] = await Promise.all([
      Visitor.find().sort({ timestamp: -1 }).skip(skip).limit(limit),
      Visitor.countDocuments(),
    ]);

    successResponse(
      res,
      paginatedResponse(visitors, total, page, limit),
      'Visitors retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

// GET /api/visitors/analytics (admin)
export const getAnalytics = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const [
      totalVisits,
      visitsLast30Days,
      visitsLast7Days,
      visitsToday,
      topPages,
      topCountries,
      visitsByDay,
      uniqueIPs,
    ] = await Promise.all([
      Visitor.countDocuments(),
      Visitor.countDocuments({ timestamp: { $gte: last30Days } }),
      Visitor.countDocuments({ timestamp: { $gte: last7Days } }),
      Visitor.countDocuments({ timestamp: { $gte: today } }),
      Visitor.aggregate([
        { $group: { _id: '$page', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $project: { page: '$_id', count: 1, _id: 0 } },
      ]),
      Visitor.aggregate([
        { $match: { country: { $exists: true, $ne: null } } },
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $project: { country: '$_id', count: 1, _id: 0 } },
      ]),
      Visitor.aggregate([
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
      Visitor.distinct('ip').then((ips) => ips.length),
    ]);

    successResponse(
      res,
      {
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
      },
      'Analytics retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};
