import { Request, Response, NextFunction } from 'express';
import PortfolioData from '../models/PortfolioData';
import { successResponse, errorResponse } from '../utils/response';

// GET /api/portfolio/:key (public)
export const getData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { key } = req.params;
    const data = await PortfolioData.findOne({ key: key.toLowerCase() });
    if (!data) {
      errorResponse(res, `Portfolio data for key '${key}' not found`, 404);
      return;
    }
    successResponse(res, data, 'Portfolio data retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// GET /api/portfolio (public) - get all keys
export const getAllData = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await PortfolioData.find().sort({ key: 1 });
    successResponse(res, data, 'All portfolio data retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// PUT /api/portfolio/:key (admin) - upsert
export const updateData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { key } = req.params;
    const { value } = req.body as { value: unknown };

    if (value === undefined || value === null) {
      errorResponse(res, 'Value is required in request body', 400);
      return;
    }

    const data = await PortfolioData.findOneAndUpdate(
      { key: key.toLowerCase() },
      { key: key.toLowerCase(), value },
      { new: true, upsert: true, runValidators: true }
    );

    successResponse(res, data, `Portfolio data for '${key}' updated successfully`);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/portfolio/:key (admin)
export const deleteData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { key } = req.params;
    const data = await PortfolioData.findOneAndDelete({ key: key.toLowerCase() });
    if (!data) {
      errorResponse(res, `Portfolio data for key '${key}' not found`, 404);
      return;
    }
    successResponse(res, null, `Portfolio data for '${key}' deleted successfully`);
  } catch (error) {
    next(error);
  }
};
