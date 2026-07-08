import { Request, Response, NextFunction } from 'express';
import Testimonial from '../models/Testimonial';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response';

// GET /api/testimonials (public)
export const getTestimonials = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [testimonials, total] = await Promise.all([
      Testimonial.find().sort({ rating: -1, createdAt: -1 }).skip(skip).limit(limit),
      Testimonial.countDocuments(),
    ]);

    successResponse(
      res,
      paginatedResponse(testimonials, total, page, limit),
      'Testimonials retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

// GET /api/testimonials/:id (public)
export const getTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      errorResponse(res, 'Testimonial not found', 404);
      return;
    }
    successResponse(res, testimonial, 'Testimonial retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// POST /api/testimonials (admin)
export const createTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const file = req.file as (Express.Multer.File & { path: string }) | undefined;
    const testimonial = await Testimonial.create({
      ...req.body,
      ...(file?.path ? { avatar: file.path } : {}),
    });
    successResponse(res, testimonial, 'Testimonial created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/testimonials/:id (admin)
export const updateTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const file = req.file as (Express.Multer.File & { path: string }) | undefined;
    const updateData: Record<string, unknown> = { ...req.body };
    if (file?.path) updateData.avatar = file.path;

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!testimonial) {
      errorResponse(res, 'Testimonial not found', 404);
      return;
    }
    successResponse(res, testimonial, 'Testimonial updated successfully');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/testimonials/:id (admin)
export const deleteTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      errorResponse(res, 'Testimonial not found', 404);
      return;
    }
    successResponse(res, null, 'Testimonial deleted successfully');
  } catch (error) {
    next(error);
  }
};
