export declare class UserType {
    _id: string;
    username: string;
    password: string;
    name: string;
    surname: string;
    admin: boolean;
}
export declare class LoggedUserType {
    user: UserType;
    token: string;
}
