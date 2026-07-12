import mongoose, { Document } from 'mongoose';
export type AchievementType = 'hackathon' | 'competition' | 'award' | 'recognition' | 'scholarship' | 'publication' | 'open-source' | 'other';
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
declare const Achievement: mongoose.Model<IAchievement, {}, {}, {}, mongoose.Document<unknown, {}, IAchievement, {}, {}> & IAchievement & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Achievement;
//# sourceMappingURL=Achievement.d.ts.map