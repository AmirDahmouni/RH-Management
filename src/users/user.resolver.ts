import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard }  from 'src/auth/gql-auth.guard';
import { UserType, LoggedUserType } from './types/user.type';
import { AddUserInput, LoginInput, UpdateUserInput, UpdatePasswordInput } from './types/user.input';
import { User } from './types/user';
import { AuthService } from 'src/auth/auth.service';


@Resolver('User')
export class UserResolver {

    constructor(private userService: UserService,private authService:AuthService) {}

    @Query(() => LoggedUserType)
    async login(@Args('loginInput') loginInput: LoginInput) {
        return await this.authService.login(loginInput)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [UserType])
    getUsers(@CurrentUser() user: any) {
        return this.userService.getUsers(user._id)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => UserType)
    getUserWithToken(@CurrentUser() user: any) {
        return this.userService.getUser(user._id)
    }

    @Query(() => UserType)
    getUser(@Args('userid') userid: string) {
    
        return this.userService.getUser(userid)
    }

    @Mutation(() => UserType)
    addUser(@Args('UserInput') addUserInput: AddUserInput) {
    
        const { username, password, name, surname,admin,holiday,position,departement,work,telephone,email }
         = addUserInput
         
        return this.userService.addUser(username, password, name, surname,admin,holiday,position,departement,work,telephone,email,addUserInput.avatar)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserType)
    updateUser(@Args('UpdateUserInput') userInput: UpdateUserInput, @CurrentUser() user: User) {
        
        const { username, name, surname,avatar,position,departement,work,telephone,email } = userInput
        return this.userService.editUser(user._id, username, name, surname,position,departement,work,telephone,email,avatar)
    }

    @Mutation(() => UserType)
    updateUserById(@Args('UpdateUserInput') userInput: UpdateUserInput) {
        
        const { id,username, name, surname,avatar,position,departement,work,telephone,email } = userInput
        return this.userService.editUser(id, username, name, surname,position,departement,work,telephone,email,avatar)
    }

    
    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserType)
    updateUserPassword(@Args('UpdatePasswordInput') updatePasswordInput: UpdatePasswordInput, @CurrentUser() user: User) {
        
        const { oldPassword, newPassword } = updatePasswordInput
        return this.userService.updatePassword(user._id,oldPassword,newPassword);
    }
    
    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserType)
    deleteUser(@Args('userid') userId: string, @CurrentUser() user: User) {

        return this.userService.deleteUser(user._id, userId);
    }

    



}