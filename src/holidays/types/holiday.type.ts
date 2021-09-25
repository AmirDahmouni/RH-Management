import { Field, ObjectType } from "@nestjs/graphql";
import {UserType} from "../../users/types/user.type"

@ObjectType()
export class HolidayType {

    @Field({nullable:true})
    _id:string;
    @Field({nullable:true})
    start: Date;
    @Field({nullable:true})
    end:Date;
    @Field({nullable:true})
    type:string;
    @Field({nullable:true})
    state:string;
    @Field(type=>UserType)
    employee:UserType;

}