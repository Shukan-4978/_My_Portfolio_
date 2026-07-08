import { Request, Response, NextFunction } from 'express';
import Service from '../models/Service';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response';

// GET /api/services (public)
export const getServices = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
      Service.find().sort({ order: 1 }).skip(skip).limit(limit),
      Service.countDocuments(),
    ]);

    successResponse(
      res,
      paginatedResponse(services, total, page, limit),
      'Services retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

// GET /api/services/:id (public)
export const getService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      errorResponse(res, 'Service not found', 404);
      return;
    }
    successResponse(res, service, 'Service retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// POST /api/services (admin)
export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const service = await Service.create(req.body);
    successResponse(res, service, 'Service created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/services/:id (admin)
export const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      errorResponse(res, 'Service not found', 404);
      return;
    }
    successResponse(res, service, 'Service updated successfully');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/services/:id (admin)
export const deleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      errorResponse(res, 'Service not found', 404);
      return;
    }
    successResponse(res, null, 'Service deleted successfully');
  } catch (error) {
    next(error);
  }
};

// PATCH /api/services/order (admin)
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
    await Service.bulkWrite(bulkOps);
    successResponse(res, null, 'Service order updated');
  } catch (error) {
    next(error);
  }
};
