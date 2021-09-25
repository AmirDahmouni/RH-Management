import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { User } from "./types/user";
import {Holiday} from "../holidays/types/holiday"

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private UserModel: Model<User>,
                @InjectModel("Holiday") private HolidayModel:Model<Holiday> ) { }


    getUsers = async (id: string) => {
        try {
            const users = await this.UserModel.find().populate("holidays")
            return users.filter(user=>user._id!=id);

        } catch (error) {

            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
    addUser = async (username: string, password: string, name: string, surname: string,admin:boolean,
        holiday:boolean,position:string,departement:string,work:string,telephone:string,email:string,avatar?:string) => {
        try 
        {
            const user = await this.UserModel.findOne({username:username})
            if (!user) {
                const hashedpass = await bcrypt.hash(password, 11);
                const newUser = new this.UserModel({
                    username,
                    surname,
                    name,
                    telephone,
                    email,
                    password: hashedpass,
                    admin,
                    avatar,
                    holiday,
                    position,
                    departement,
                    work
                })
                return await(await newUser.save()).populate("holidays")
            }
            throw new HttpException('user already exists', HttpStatus.CONFLICT)
        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    getUser = async (userid: string) => {

        try {
            const user = await this.UserModel.findOne({ _id: userid }).populate("holidays")
            if (user)  return user
            throw new HttpException('user not found', HttpStatus.NOT_FOUND)

        } catch (error) {

            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
    getUserByUsername = async (username: string) => {

        try {
            const user = await this.UserModel.findOne({ username: username }).populate("holidays")
            if (user) return user
            throw new HttpException('user not found', HttpStatus.NOT_FOUND)

        } catch (error) {

            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
    getUserByToken = async (userId: string) => {

        try {
            const user = await this.UserModel.findById(userId).populate("holidays")
            if (user)
                return user
            throw new HttpException('user not found', HttpStatus.NOT_FOUND)

        } catch (error) {

            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
    editUser = async ( userId: string, username: string, name: string, surname: string,
        position:string,departement:string,work:string,telephone:string,email:string,avatar?:string) => {
        try {
            let finduser=await this.UserModel.findById({_id:userId})
            if(!finduser) throw new HttpException('email does not exist', HttpStatus.NOT_FOUND)
            let dataUser={
                username:username || finduser.username,
                name: name || finduser.name,
                surname: surname || finduser.surname,
                avatar:avatar || finduser.avatar,
                position: position || finduser.position,
                departement: departement || finduser.departement,
                work: work || finduser.work,
                telephone:telephone || finduser.telephone,
                email: email || finduser.email 
            }
            let user=await this.UserModel.findByIdAndUpdate({ _id: userId }, { $set:dataUser }).populate("holidays")
            if(user) return await this.UserModel.findById(userId).populate("holidays")
            throw new HttpException('username already exists', HttpStatus.CONFLICT)
        } catch (error) {
            console.log(error.message)
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
    updatePassword = async (userId: string, oldPassword: string, newPassword: string) => {

        try {
            
            let user = await this.UserModel.findById(userId)
            if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND) 
            let validpassword=await bcrypt.compare(oldPassword, user.password) 
            if(!validpassword) throw new HttpException('Wrong password', HttpStatus.FORBIDDEN)
            const hashedpass = await bcrypt.hash(newPassword, 11);
            user.password = hashedpass;
            user= await user.save()
            return user
                    
        } catch (error) {

            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
    deleteUser = async (senderId: string, userId: string) => {

        try {
            const user = await this.UserModel.findOne({ _id: senderId,admin:true })
            if (user) 
            {
                await this.UserModel.deleteOne({ _id: userId })
                await this.HolidayModel.deleteMany({employee:userId})
                return user
            }
            throw new HttpException('user not found', HttpStatus.NOT_FOUND)

        } catch (error) {

            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
   
}