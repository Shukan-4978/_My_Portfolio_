import mongoose, { Document, Schema } from 'mongoose';

export type ExperienceType = 'full-time' | 'part-time' | 'internship' | 'freelance' | 'contract';

export interface IExperience extends Document {
  company: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string[];
  logo?: string;
  type: string;
  location: string;
  skills: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [150, 'Company name cannot exceed 150 characters'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
      maxlength: [150, 'Role cannot exceed 150 characters'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: {
      type: [String],
      required: [true, 'Description is required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'At least one description bullet point is required',
      },
    },
    logo: { type: String, trim: true },
    type: {
      type: String,
      required: [true, 'Experience type is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    skills: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

experienceSchema.index({ order: 1 });
experienceSchema.index({ current: -1, startDate: -1 });

const Experience = mongoose.model<IExperience>('Experience', experienceSchema);

export default Experience;
