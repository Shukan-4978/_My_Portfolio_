import mongoose, { Document } from 'mongoose';
export interface ICertificate extends Document {
    title: string;
    issuer: string;
    date: Date;
    image?: string;
    credentialUrl?: string;
    credentialId?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const Certificate: mongoose.Model<ICertificate, {}, {}, {}, mongoose.Document<unknown, {}, ICertificate, {}, {}> & ICertificate & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Certificate;
//# sourceMappingURL=Certificate.d.ts.map