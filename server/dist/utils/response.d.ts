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
export declare const successResponse: <T>(res: Response, data: T, message?: string, statusCode?: number) => Response;
/**
 * Send a standardized error response
 */
export declare const errorResponse: (res: Response, message?: string, statusCode?: number) => Response;
/**
 * Build a paginated response payload
 */
export declare const paginatedResponse: <T>(items: T[], total: number, page: number, limit: number) => PaginatedData<T>;
//# sourceMappingURL=response.d.ts.map