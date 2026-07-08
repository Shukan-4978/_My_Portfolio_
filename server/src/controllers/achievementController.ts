import { Request, Response, NextFunction } from 'express';
import Achievement from '../models/Achievement';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response';

// GET /api/achievements (public)
export const getAchievements = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const type = req.query.type as string | undefined;

    const filter: Record<string, unknown> = {};
    if (type) filter.type = type;

    const [achievements, total] = await Promise.all([
      Achievement.find(filter).sort({ date: -1 }).skip(skip).limit(limit),
      Achievement.countDocuments(filter),
    ]);

    successResponse(
      res,
      paginatedResponse(achievements, total, page, limit),
      'Achievements retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

// GET /api/achievements/:id (public)
export const getAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      errorResponse(res, 'Achievement not found', 404);
      return;
    }
    successResponse(res, achievement, 'Achievement retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// POST /api/achievements (admin)
export const createAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const achievement = await Achievement.create(req.body);
    successResponse(res, achievement, 'Achievement created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/achievements/:id (admin)
export const updateAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!achievement) {
      errorResponse(res, 'Achievement not found', 404);
      return;
    }
    successResponse(res, achievement, 'Achievement updated successfully');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/achievements/:id (admin)
export const deleteAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) {
      errorResponse(res, 'Achievement not found', 404);
      return;
    }
    successResponse(res, null, 'Achievement deleted successfully');
  } catch (error) {
    next(error);
  }
};
