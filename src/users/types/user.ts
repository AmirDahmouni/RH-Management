

export interface User {
    _id: string;
    email:string;
    username: string;
    telephone:string;
    password: string;
    name: string;
    surname: string;
    admin: boolean;
    avatar:string;
    holidays:string[];
    holiday:boolean;
    position:string;
    departement:string;
    work:string;
}