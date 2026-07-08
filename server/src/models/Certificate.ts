import mongoose, { Document, Schema } from 'mongoose';

export interface ICertificate extends Document {
  title: string;
  issuer: string;
  date: Date;
  image?: string;
  credentialUrl?: string;
  credentialId?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const certificateSchema = new Schema<ICertificate>(
  {
    title: {
      type: String,
      required: [true, 'Certificate title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    issuer: {
      type: String,
      required: [true, 'Issuer is required'],
      trim: true,
      maxlength: [150, 'Issuer cannot exceed 150 characters'],
    },
    date: {
      type: Date,
      required: [true, 'Issue date is required'],
    },
    image: { type: String, trim: true },
    credentialUrl: { type: String, trim: true },
    credentialId: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

certificateSchema.index({ order: 1 });
certificateSchema.index({ date: -1 });

const Certificate = mongoose.model<ICertificate>('Certificate', certificateSchema);

export default Certificate;
