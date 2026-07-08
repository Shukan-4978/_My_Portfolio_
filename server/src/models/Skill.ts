import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  icon: string;
  category: string;
  level: number;
  yearsExp: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    icon: {
      type: String,
      required: [true, 'Icon is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    level: {
      type: Number,
      required: [true, 'Level is required'],
      min: [0, 'Level cannot be below 0'],
      max: [100, 'Level cannot exceed 100'],
    },
    yearsExp: {
      type: Number,
      required: [true, 'Years of experience is required'],
      min: [0, 'Years cannot be negative'],
    },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

skillSchema.index({ category: 1, order: 1 });

const Skill = mongoose.model<ISkill>('Skill', skillSchema);

export default Skill;
