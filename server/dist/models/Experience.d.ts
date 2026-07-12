import mongoose, { Document } from 'mongoose';
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
declare const Experience: mongoose.Model<IExperience, {}, {}, {}, mongoose.Document<unknown, {}, IExperience, {}, {}> & IExperience & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Experience;
//# sourceMappingURL=Experience.d.ts.map