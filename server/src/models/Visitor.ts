import mongoose, { Document, Schema } from 'mongoose';

export interface IVisitor extends Document {
  ip: string;
  page: string;
  userAgent: string;
  timestamp: Date;
  country?: string;
}

const visitorSchema = new Schema<IVisitor>(
  {
    ip: {
      type: String,
      required: [true, 'IP address is required'],
      trim: true,
    },
    page: {
      type: String,
      required: [true, 'Page is required'],
      trim: true,
    },
    userAgent: {
      type: String,
      required: [true, 'User agent is required'],
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    country: { type: String, trim: true },
  },
  {
    // No timestamps since we use explicit timestamp field
    timestamps: false,
  }
);

visitorSchema.index({ timestamp: -1 });
visitorSchema.index({ ip: 1 });
visitorSchema.index({ page: 1 });
// TTL index: auto-delete visitor records after 90 days
visitorSchema.index({ timestamp: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

const Visitor = mongoose.model<IVisitor>('Visitor', visitorSchema);

export default Visitor;
