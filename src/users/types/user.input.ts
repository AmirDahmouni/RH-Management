  
import { Field, InputType } from "@nestjs/graphql";


@InputType({ description: 'Login Input' })
export class LoginInput {
    @Field()
    email:string;
    @Field()
    password: string;
}

@InputType({ description: 'add user input' })
export class AddUserInput {
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
    @Field()
    holiday:boolean;
    @Field()
    position:string;
    @Field()
    departement:string;
    @Field()
    work:string;
}

@InputType({ description: 'update user input' })
export class UpdateUserInput {
    
    @Field({ nullable:true })
    id:string;
    @Field({ nullable: true })
    email:string;
    @Field({ nullable: true })
    telephone:string;
    @Field({ nullable: true })
    username: string;
    @Field({ nullable: true })
    name: string;
    @Field({ nullable: true })
    surname: string;
    @Field({ nullable: true })
    holiday: boolean;
    @Field({ nullable: true })
    admin: boolean;
    @Field({ nullable:true })
    avatar:string;
    @Field({ nullable:true })
    position:string;
    @Field({ nullable:true })
    departement:string;
    @Field({ nullable:true })
    work:string;


}

@InputType({ description: 'update user password input' })
export class UpdatePasswordInput {


    @Field()
    oldPassword: string;
    @Field()
    newPassword: string;

}