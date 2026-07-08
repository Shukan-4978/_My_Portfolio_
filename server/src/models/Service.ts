import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    icon: {
      type: String,
      required: [true, 'Icon is required'],
      trim: true,
    },
    features: {
      type: [String],
      default: [],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'At least one feature is required',
      },
    },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

serviceSchema.index({ order: 1 });

const Service = mongoose.model<IService>('Service', serviceSchema);

export default Service;
