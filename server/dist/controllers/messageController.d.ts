import { Request, Response, NextFunction } from 'express';
export declare const sendMessage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getMessages: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const markRead: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const markAllRead: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteMessage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=messageController.d.ts.map