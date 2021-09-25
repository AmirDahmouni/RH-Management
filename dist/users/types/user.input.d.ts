export declare class LoginInput {
    username: string;
    password: string;
}
export declare class AddUserInput {
    username: string;
    password: string;
    name: string;
    surname: string;
}
export declare class UpdateUserInput {
    userId: string;
    username: string;
    name: string;
    surname: string;
    admin: boolean;
}
export declare class UpdatePasswordInput {
    userId: string;
    oldPassword: string;
    newPassword: string;
}
