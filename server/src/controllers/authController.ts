import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import Admin from '../models/Admin';
import { env } from '../config/env';
import { successResponse, errorResponse } from '../utils/response';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !env.isDev,
  sameSite: 'strict' as const,
  path: '/',
};

const generateAccessToken = (id: string, email: string, role: string): string =>
  jwt.sign({ id, email, role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'],
  });

const generateRefreshToken = (id: string): string =>
  jwt.sign({ id }, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiresIn as jwt.SignOptions['expiresIn'],
  });

// POST /api/auth/login
export const login = async (
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

    const { email, password } = req.body as { email: string; password: string };

    const admin = await Admin.findOne({ email }).select('+passwordHash');
    if (!admin) {
      errorResponse(res, 'Invalid email or password', 401);
      return;
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      errorResponse(res, 'Invalid email or password', 401);
      return;
    }

    const accessToken = generateAccessToken(
      admin._id.toString(),
      admin.email,
      admin.role
    );
    const refreshToken = generateRefreshToken(admin._id.toString());

    // Set tokens in httpOnly cookies
    res.cookie('accessToken', accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie('refreshToken', refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    successResponse(
      res,
      {
        accessToken,
        admin: {
          id: admin._id,
          email: admin.email,
          role: admin.role,
        },
      },
      'Login successful'
    );
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/logout
export const logout = (_req: Request, res: Response): void => {
  res.clearCookie('accessToken', COOKIE_OPTIONS);
  res.clearCookie('refreshToken', COOKIE_OPTIONS);
  successResponse(res, null, 'Logged out successfully');
};

// POST /api/auth/refresh
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: string | undefined =
      req.cookies?.refreshToken || req.body?.refreshToken;

    if (!token) {
      errorResponse(res, 'No refresh token provided', 401);
      return;
    }

    let decoded: { id: string };
    try {
      decoded = jwt.verify(token, env.jwtRefreshSecret) as { id: string };
    } catch {
      errorResponse(res, 'Invalid or expired refresh token', 401);
      return;
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      errorResponse(res, 'Admin not found', 401);
      return;
    }

    const accessToken = generateAccessToken(
      admin._id.toString(),
      admin.email,
      admin.role
    );

    res.cookie('accessToken', accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000,
    });

    successResponse(res, { accessToken }, 'Token refreshed successfully');
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const admin = await Admin.findById(req.admin?.id).select('-passwordHash');
    if (!admin) {
      errorResponse(res, 'Admin not found', 404);
      return;
    }
    successResponse(res, admin, 'Admin retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/seed (one-time setup)
export const seedAdmin = async (): Promise<void> => {
  try {
    const existing = await Admin.findOne({ email: env.adminEmail });
    if (existing) {
      console.log('✅ Admin already exists, skipping seed.');
      return;
    }

    const admin = new Admin({
      email: env.adminEmail,
      passwordHash: env.adminPassword, // will be hashed by pre-save hook
      role: 'super_admin',
    });

    await admin.save();
    console.log(`✅ Default admin seeded: ${env.adminEmail}`);
  } catch (error) {
    console.error('❌ Failed to seed admin:', error);
  }
};
