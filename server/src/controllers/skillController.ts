import { Request, Response, NextFunction } from 'express';
import Skill from '../models/Skill';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response';

// GET /api/skills (public)
export const getSkills = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;
    const category = req.query.category as string | undefined;

    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;

    const [skills, total] = await Promise.all([
      Skill.find(filter).sort({ category: 1, order: 1 }).skip(skip).limit(limit),
      Skill.countDocuments(filter),
    ]);

    successResponse(res, paginatedResponse(skills, total, page, limit), 'Skills retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// GET /api/skills/:id (public)
export const getSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      errorResponse(res, 'Skill not found', 404);
      return;
    }
    successResponse(res, skill, 'Skill retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// POST /api/skills (admin)
export const createSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const skill = await Skill.create(req.body);
    successResponse(res, skill, 'Skill created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/skills/:id (admin)
export const updateSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) {
      errorResponse(res, 'Skill not found', 404);
      return;
    }
    successResponse(res, skill, 'Skill updated successfully');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/skills/:id (admin)
export const deleteSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      errorResponse(res, 'Skill not found', 404);
      return;
    }
    successResponse(res, null, 'Skill deleted successfully');
  } catch (error) {
    next(error);
  }
};

// PATCH /api/skills/order (admin)
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
    await Skill.bulkWrite(bulkOps);
    successResponse(res, null, 'Skill order updated');
  } catch (error) {
    next(error);
  }
};
