import mongoose, { Document, Schema } from 'mongoose';
import slugify from 'slugify';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: number;
  coverImage?: string;
  publishedAt?: Date;
  featured: boolean;
  draft: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      trim: true,
      maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    tags: { type: [String], default: [] },
    readTime: {
      type: Number,
      required: [true, 'Read time is required'],
      min: [1, 'Read time must be at least 1 minute'],
    },
    coverImage: { type: String, trim: true },
    publishedAt: { type: Date },
    featured: { type: Boolean, default: false },
    draft: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from title before saving
blogSchema.pre<IBlog>('save', async function (next) {
  if (!this.isModified('title') && this.slug) return next();

  let baseSlug = slugify(this.title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 0;

  // Ensure unique slug
  while (true) {
    const existing = await mongoose
      .model('Blog')
      .findOne({ slug, _id: { $ne: this._id } });
    if (!existing) break;
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  this.slug = slug;
  next();
});

blogSchema.index({ slug: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ draft: 1, publishedAt: -1 });
blogSchema.index({ featured: -1, publishedAt: -1 });

const Blog = mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;
