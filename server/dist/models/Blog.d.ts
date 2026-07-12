import mongoose, { Document } from 'mongoose';
export interface IBlog extends Document {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string[];
    readTime: number;
    coverImage?: string;
    publishedAt?: Date;
    featured: boolean;
    draft: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const Blog: mongoose.Model<IBlog, {}, {}, {}, mongoose.Document<unknown, {}, IBlog, {}, {}> & IBlog & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Blog;
//# sourceMappingURL=Blog.d.ts.map