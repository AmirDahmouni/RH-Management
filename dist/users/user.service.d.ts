import { HttpException } from "@nestjs/common";
import { Model } from 'mongoose';
import { User } from "./types/user";
export declare class UserService {
    private UserModel;
    constructor(UserModel: Model<User>);
    getUsers: () => Promise<(User & import("mongoose").Document<any, any, User>)[] | HttpException>;
    addUser: (username: string, password: string, name: string, surname: string) => Promise<(User & import("mongoose").Document<any, any, User>) | HttpException>;
    getUser: (userid: string) => Promise<(User & import("mongoose").Document<any, any, User>) | HttpException>;
    getUserByUsername: (username: string) => Promise<(User & import("mongoose").Document<any, any, User>) | HttpException>;
    getUserByToken: (userId: string) => Promise<(User & import("mongoose").Document<any, any, User>) | HttpException>;
    editUser: (senderId: string, userId: string, username: string, name: string, surname: string, admin: boolean) => Promise<(User & import("mongoose").Document<any, any, User>) | HttpException>;
    updatePassword: (senderId: string, userId: string, oldPassword: string, newPassword: string) => Promise<(User & import("mongoose").Document<any, any, User>) | HttpException>;
    deleteUser: (senderId: string, userId: string) => Promise<(User & import("mongoose").Document<any, any, User>) | HttpException>;
}
