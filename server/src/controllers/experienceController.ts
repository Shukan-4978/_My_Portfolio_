import { Request, Response, NextFunction } from 'express';
import Experience from '../models/Experience';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response';

// GET /api/experience (public)
export const getExperiences = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [experiences, total] = await Promise.all([
      Experience.find()
        .sort({ current: -1, startDate: -1, order: 1 })
        .skip(skip)
        .limit(limit),
      Experience.countDocuments(),
    ]);

    successResponse(
      res,
      paginatedResponse(experiences, total, page, limit),
      'Experiences retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

// GET /api/experience/:id (public)
export const getExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      errorResponse(res, 'Experience not found', 404);
      return;
    }
    successResponse(res, experience, 'Experience retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// POST /api/experience (admin)
export const createExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const experience = await Experience.create(req.body);
    successResponse(res, experience, 'Experience created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/experience/:id (admin)
export const updateExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!experience) {
      errorResponse(res, 'Experience not found', 404);
      return;
    }
    successResponse(res, experience, 'Experience updated successfully');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/experience/:id (admin)
export const deleteExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      errorResponse(res, 'Experience not found', 404);
      return;
    }
    successResponse(res, null, 'Experience deleted successfully');
  } catch (error) {
    next(error);
  }
};

// PATCH /api/experience/order (admin)
export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { items } = req.body as { items: Array<{ id: string; order: number }> };
    if (!Array.isArray(items) || items.length === 0) {
      errorResponse(res, 'Items array is required', 400);
      return;
    }
    const bulkOps = items.map(({ id, order }) => ({
      updateOne: { filter: { _id: id }, update: { $set: { order } } },
    }));
    await Experience.bulkWrite(bulkOps);
    successResponse(res, null, 'Experience order updated');
  } catch (error) {
    next(error);
  }
};
