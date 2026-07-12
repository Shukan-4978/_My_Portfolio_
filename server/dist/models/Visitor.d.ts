import mongoose, { Document } from 'mongoose';
export interface IVisitor extends Document {
    ip: string;
    page: string;
    userAgent: string;
    timestamp: Date;
    country?: string;
}
declare const Visitor: mongoose.Model<IVisitor, {}, {}, {}, mongoose.Document<unknown, {}, IVisitor, {}, {}> & IVisitor & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Visitor;
//# sourceMappingURL=Visitor.d.ts.map