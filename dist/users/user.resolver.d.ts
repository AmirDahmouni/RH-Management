/// <reference types="mongoose" />
import { UserService } from './user.service';
import { AddUserInput, LoginInput } from './types/user.input';
import { User } from './types/user';
import { AuthService } from 'src/auth/auth.service';
export declare class UserResolver {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    login(loginInput: LoginInput): Promise<{
        user: User & import("mongoose").Document<any, any, User>;
        token: string;
    }>;
    getUsers(): Promise<(User & import("mongoose").Document<any, any, User>)[] | import("@nestjs/common").HttpException>;
    getUserWithToken(user: any): Promise<(User & import("mongoose").Document<any, any, User>) | import("@nestjs/common").HttpException>;
    getUser(userid: string): Promise<(User & import("mongoose").Document<any, any, User>) | import("@nestjs/common").HttpException>;
    addUser(addUserInput: AddUserInput): Promise<(User & import("mongoose").Document<any, any, User>) | import("@nestjs/common").HttpException>;
}
