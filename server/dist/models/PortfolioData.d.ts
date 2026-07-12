import mongoose, { Document } from 'mongoose';
export interface IPortfolioData extends Document {
    key: string;
    value: any;
    updatedAt: Date;
}
declare const PortfolioData: mongoose.Model<IPortfolioData, {}, {}, {}, mongoose.Document<unknown, {}, IPortfolioData, {}, {}> & IPortfolioData & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default PortfolioData;
//# sourceMappingURL=PortfolioData.d.ts.map