import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolioData extends Document {
  key: string;
  value: any;
  updatedAt: Date;
}

const portfolioDataSchema = new Schema<IPortfolioData>(
  {
    key: {
      type: String,
      required: [true, 'Key is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    value: {
      type: Schema.Types.Mixed,
      required: [true, 'Value is required'],
    },
  },
  {
    timestamps: true,
  }
);

portfolioDataSchema.index({ key: 1 });

const PortfolioData = mongoose.model<IPortfolioData>(
  'PortfolioData',
  portfolioDataSchema
);

export default PortfolioData;
