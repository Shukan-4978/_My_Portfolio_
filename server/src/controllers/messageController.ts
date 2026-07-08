import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Message from '../models/Message';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response';

// POST /api/messages (public, rate-limited)
export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
      return;
    }

    const { name, email, subject, message } = req.body as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };

    const newMessage = await Message.create({ name, email, subject, message });
    successResponse(
      res,
      { id: newMessage._id },
      'Message sent successfully! I will get back to you soon.',
      201
    );
  } catch (error) {
    next(error);
  }
};

// GET /api/messages (admin)
export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const readFilter = req.query.read;

    const filter: Record<string, unknown> = {};
    if (readFilter === 'true') filter.read = true;
    if (readFilter === 'false') filter.read = false;

    const [messages, total] = await Promise.all([
      Message.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Message.countDocuments(filter),
    ]);

    const unreadCount = await Message.countDocuments({ read: false });

    successResponse(
      res,
      { ...paginatedResponse(messages, total, page, limit), unreadCount },
      'Messages retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

// PATCH /api/messages/:id/read (admin)
export const markRead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) {
      errorResponse(res, 'Message not found', 404);
      return;
    }
    successResponse(res, message, 'Message marked as read');
  } catch (error) {
    next(error);
  }
};

// PATCH /api/messages/mark-all-read (admin)
export const markAllRead = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await Message.updateMany({ read: false }, { read: true });
    successResponse(res, null, 'All messages marked as read');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/messages/:id (admin)
export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      errorResponse(res, 'Message not found', 404);
      return;
    }
    successResponse(res, null, 'Message deleted successfully');
  } catch (error) {
    next(error);
  }
};
