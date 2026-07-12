import { Document, Model } from 'mongoose';
export type AdminRole = 'admin' | 'super_admin';
export interface IAdmin extends Document {
    email: string;
    passwordHash: string;
    role: AdminRole;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(plainPassword: string): Promise<boolean>;
}
interface IAdminModel extends Model<IAdmin> {
}
declare const Admin: IAdminModel;
export default Admin;
//# sourceMappingURL=Admin.d.ts.map