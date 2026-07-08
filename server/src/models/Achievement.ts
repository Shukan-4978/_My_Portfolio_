import mongoose, { Document, Schema } from 'mongoose';

export type AchievementType =
  | 'hackathon'
  | 'competition'
  | 'award'
  | 'recognition'
  | 'scholarship'
  | 'publication'
  | 'open-source'
  | 'other';

export interface IAchievement extends Document {
  title: string;
  type: string;
  description: string;
  icon?: string;
  date: Date;
  url?: string;
  rank?: string;
  createdAt: Date;
  updatedAt: Date;
}

const achievementSchema = new Schema<IAchievement>(
  {
    title: {
      type: String,
      required: [true, 'Achievement title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    type: {
      type: String,
      required: [true, 'Achievement type is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    icon: { type: String, trim: true },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    url: { type: String, trim: true },
    rank: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

achievementSchema.index({ date: -1 });
achievementSchema.index({ type: 1 });

const Achievement = mongoose.model<IAchievement>('Achievement', achievementSchema);

export default Achievement;
