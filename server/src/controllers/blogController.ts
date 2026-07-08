import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Blog from '../models/Blog';
import { cloudinary } from '../config/cloudinary';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response';

// GET /api/blogs (public)
export const getBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const tag = req.query.tag as string | undefined;
    const featured = req.query.featured === 'true';

    const filter: Record<string, unknown> = { draft: false };
    if (tag) filter.tags = tag;
    if (featured) filter.featured = true;

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .select('-content')
        .sort({ featured: -1, publishedAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments(filter),
    ]);

    successResponse(
      res,
      paginatedResponse(blogs, total, page, limit),
      'Blogs retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

// GET /api/blogs/:slug (public)
export const getBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, draft: false });
    if (!blog) {
      errorResponse(res, 'Blog not found', 404);
      return;
    }
    successResponse(res, blog, 'Blog retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// POST /api/blogs (admin)
export const createBlog = async (
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

    const file = req.file as (Express.Multer.File & { path: string }) | undefined;
    const coverImage = file?.path;

    const blog = await Blog.create({
      ...req.body,
      ...(coverImage ? { coverImage } : {}),
    });
    successResponse(res, blog, 'Blog created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/blogs/:id (admin)
export const updateBlog = async (
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

    const file = req.file as (Express.Multer.File & { path: string }) | undefined;
    const updateData: Record<string, unknown> = { ...req.body };
    if (file?.path) updateData.coverImage = file.path;

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      errorResponse(res, 'Blog not found', 404);
      return;
    }
    successResponse(res, blog, 'Blog updated successfully');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/blogs/:id (admin)
export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      errorResponse(res, 'Blog not found', 404);
      return;
    }

    // Clean up cover image from Cloudinary if it exists
    if (blog.coverImage) {
      // Extract public_id from Cloudinary URL
      const parts = blog.coverImage.split('/');
      const fileName = parts[parts.length - 1];
      const publicId = `portfolio/${fileName.split('.')[0]}`;
      await cloudinary.uploader.destroy(publicId).catch(() => null);
    }

    await blog.deleteOne();
    successResponse(res, null, 'Blog deleted successfully');
  } catch (error) {
    next(error);
  }
};

// PATCH /api/blogs/:id/publish (admin)
export const publishBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { draft: false, publishedAt: new Date() },
      { new: true }
    );
    if (!blog) {
      errorResponse(res, 'Blog not found', 404);
      return;
    }
    successResponse(res, blog, 'Blog published successfully');
  } catch (error) {
    next(error);
  }
};

// PATCH /api/blogs/:id/unpublish (admin)
export const unpublishBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { draft: true },
      { new: true }
    );
    if (!blog) {
      errorResponse(res, 'Blog not found', 404);
      return;
    }
    successResponse(res, blog, 'Blog unpublished successfully');
  } catch (error) {
    next(error);
  }
};

// GET /api/blogs/admin/all (admin - includes drafts)
export const getAllBlogsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find()
        .select('-content')
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments(),
    ]);

    successResponse(
      res,
      paginatedResponse(blogs, total, page, limit),
      'All blogs retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};
