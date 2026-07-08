import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Project from '../models/Project';
import { cloudinary } from '../config/cloudinary';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response';

// GET /api/projects (public)
export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const featured = req.query.featured === 'true';
    const category = req.query.category as string | undefined;

    const filter: Record<string, unknown> = {};
    if (featured) filter.featured = true;
    if (category) filter.category = category;

    const [projects, total] = await Promise.all([
      Project.find(filter)
        .sort({ featured: -1, order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Project.countDocuments(filter),
    ]);

    successResponse(
      res,
      paginatedResponse(projects, total, page, limit),
      'Projects retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id (public)
export const getProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      errorResponse(res, 'Project not found', 404);
      return;
    }
    successResponse(res, project, 'Project retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// POST /api/projects (admin)
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
      return;
    }

    const files = req.files as Express.Multer.File[] | undefined;
    const images = files?.map((file) => ({
      url: (file as Express.Multer.File & { path: string }).path,
      publicId: (file as Express.Multer.File & { filename: string }).filename,
    })) ?? [];

    const project = await Project.create({ ...req.body, images });
    successResponse(res, project, 'Project created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id (admin)
export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
      return;
    }

    const files = req.files as Express.Multer.File[] | undefined;
    const updateData: Record<string, unknown> = { ...req.body };

    if (files && files.length > 0) {
      const newImages = files.map((file) => ({
        url: (file as Express.Multer.File & { path: string }).path,
        publicId: (file as Express.Multer.File & { filename: string }).filename,
      }));
      updateData.images = newImages;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      errorResponse(res, 'Project not found', 404);
      return;
    }

    successResponse(res, project, 'Project updated successfully');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id (admin)
export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      errorResponse(res, 'Project not found', 404);
      return;
    }

    // Delete images from Cloudinary
    const deletePromises = project.images.map((img) =>
      cloudinary.uploader.destroy(img.publicId)
    );
    await Promise.allSettled(deletePromises);

    await project.deleteOne();
    successResponse(res, null, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};

// PATCH /api/projects/order (admin) — drag-and-drop reordering
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
      updateOne: {
        filter: { _id: id },
        update: { $set: { order } },
      },
    }));

    await Project.bulkWrite(bulkOps);
    successResponse(res, null, 'Project order updated successfully');
  } catch (error) {
    next(error);
  }
};
