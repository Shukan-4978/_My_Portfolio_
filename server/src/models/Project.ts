import mongoose, { Document, Schema } from 'mongoose';

export interface IProjectImage {
  url: string;
  publicId: string;
  caption?: string;
}

export interface IProject extends Document {
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  images: IProjectImage[];
  github?: string;
  live?: string;
  category: string[];
  featured: boolean;
  order: number;
  features: string[];
  challenges: string[];
  architecture?: string;
  performance?: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectImageSchema = new Schema<IProjectImage>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    caption: { type: String },
  },
  { _id: false }
);

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    longDescription: { type: String, trim: true },
    techStack: {
      type: [String],
      required: [true, 'Tech stack is required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'Tech stack must have at least one item',
      },
    },
    images: { type: [projectImageSchema], default: [] },
    github: { type: String, trim: true },
    live: { type: String, trim: true },
    category: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    features: { type: [String], default: [] },
    challenges: { type: [String], default: [] },
    architecture: { type: String, trim: true },
    performance: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ featured: -1, order: 1 });
projectSchema.index({ category: 1 });

const Project = mongoose.model<IProject>('Project', projectSchema);

export default Project;
