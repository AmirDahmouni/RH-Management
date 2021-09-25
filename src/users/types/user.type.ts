import { Field, ObjectType } from "@nestjs/graphql";

import { HolidayType } from "src/holidays/types/holiday.type";

@ObjectType()
export class UserType {

    @Field()
    _id:string;
    @Field()
    email:string;
    @Field()
    telephone:string;
    @Field()
    username:string;
    @Field()
    password:string;
    @Field()
    name:string;
    @Field()
    surname:string;
    @Field()
    admin:boolean;
    @Field({nullable:true})
    avatar:string;
    @Field(type => [HolidayType],{nullable:true})
    holidays:HolidayType[]
    @Field()
    holiday:boolean;
    @Field()
    position:string;
    @Field()
    departement:string;
    @Field()
    work:string;

}

@ObjectType()
export class LoggedUserType {
    @Field({nullable:true})
    user: UserType
    @Field({nullable:true})
    token: string
}