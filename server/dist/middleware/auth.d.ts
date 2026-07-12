import { Request, Response, NextFunction } from 'express';
export interface JwtPayload {
    id: string;
    email: string;
    role: string;
}
declare global {
    namespace Express {
        interface Request {
            admin?: JwtPayload;
        }
    }
}
export declare const verifyToken: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map