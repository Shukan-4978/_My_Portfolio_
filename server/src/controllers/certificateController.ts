import { Request, Response, NextFunction } from 'express';
import Certificate from '../models/Certificate';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response';

// GET /api/certificates (public)
export const getCertificates = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [certificates, total] = await Promise.all([
      Certificate.find()
        .sort({ order: 1, date: -1 })
        .skip(skip)
        .limit(limit),
      Certificate.countDocuments(),
    ]);

    successResponse(
      res,
      paginatedResponse(certificates, total, page, limit),
      'Certificates retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

// GET /api/certificates/:id (public)
export const getCertificate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      errorResponse(res, 'Certificate not found', 404);
      return;
    }
    successResponse(res, certificate, 'Certificate retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// POST /api/certificates (admin)
export const createCertificate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const file = req.file as (Express.Multer.File & { path: string; filename: string }) | undefined;
    const imageUrl = file?.path;

    const certificate = await Certificate.create({
      ...req.body,
      ...(imageUrl ? { image: imageUrl } : {}),
    });
    successResponse(res, certificate, 'Certificate created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/certificates/:id (admin)
export const updateCertificate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const file = req.file as (Express.Multer.File & { path: string }) | undefined;
    const updateData: Record<string, unknown> = { ...req.body };
    if (file?.path) updateData.image = file.path;

    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!certificate) {
      errorResponse(res, 'Certificate not found', 404);
      return;
    }
    successResponse(res, certificate, 'Certificate updated successfully');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/certificates/:id (admin)
export const deleteCertificate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      errorResponse(res, 'Certificate not found', 404);
      return;
    }
    successResponse(res, null, 'Certificate deleted successfully');
  } catch (error) {
    next(error);
  }
};

// PATCH /api/certificates/order (admin)
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
    await Certificate.bulkWrite(bulkOps);
    successResponse(res, null, 'Certificate order updated');
  } catch (error) {
    next(error);
  }
};
