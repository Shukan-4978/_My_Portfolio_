import mongoose, { Document } from 'mongoose';
export interface ITestimonial extends Document {
    name: string;
    role: string;
    company: string;
    avatar?: string;
    rating: number;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const Testimonial: mongoose.Model<ITestimonial, {}, {}, {}, mongoose.Document<unknown, {}, ITestimonial, {}, {}> & ITestimonial & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Testimonial;
//# sourceMappingURL=Testimonial.d.ts.map