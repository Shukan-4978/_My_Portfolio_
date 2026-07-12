import mongoose, { Document } from 'mongoose';
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
declare const Skill: mongoose.Model<ISkill, {}, {}, {}, mongoose.Document<unknown, {}, ISkill, {}, {}> & ISkill & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Skill;
//# sourceMappingURL=Skill.d.ts.map