import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class FileType {

    @Field({nullable:true})
    path:string;
    @Field({nullable:true})
    error:string;
}