import mongoose, { Document } from 'mongoose';
export interface IProjectImage {
    url: string;
    publicId: string;
    caption?: string;
}
export interface IProject extends Document {
    title: string;
    description: string;
    longDescription?: string;
    techStack: string[];
    images: IProjectImage[];
    github?: string;
    live?: string;
    category: string[];
    featured: boolean;
    order: number;
    features: string[];
    challenges: string[];
    architecture?: string;
    performance?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const Project: mongoose.Model<IProject, {}, {}, {}, mongoose.Document<unknown, {}, IProject, {}, {}> & IProject & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Project;
//# sourceMappingURL=Project.d.ts.map