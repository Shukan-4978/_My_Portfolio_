import { Response } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Send a standardized success response
 */
export const successResponse = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  } satisfies ApiResponse<T>);
};

/**
 * Send a standardized error response
 */
export const errorResponse = (
  res: Response,
  message = 'An error occurred',
  statusCode = 500
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
  } satisfies ApiResponse);
};

/**
 * Build a paginated response payload
 */
export const paginatedResponse = <T>(
  items: T[],
  total: number,
  page: number,
  limit: number
): PaginatedData<T> => {
  const totalPages = Math.ceil(total / limit);
  return {
    items,
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};
