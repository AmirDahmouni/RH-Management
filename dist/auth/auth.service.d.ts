import { Model } from 'mongoose';
import { User } from "../users/types/user";
export declare class AuthService {
    private UserModel;
    constructor(UserModel: Model<User>);
    login(loginInput: any): Promise<{
        user: User & import("mongoose").Document<any, any, User>;
        token: string;
    }>;
}
