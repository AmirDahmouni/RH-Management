import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { User } from "../users/types/user";



@Injectable()
export class AuthService {

    constructor(@InjectModel('User') private UserModel: Model<User>) { }

    async login(loginInput: any) {
        try
        {
        const user = await this.UserModel.findOne({email:loginInput.email}).populate("holidays")
        if(!user) throw new HttpException('email does not exist', HttpStatus.NOT_FOUND)
        const result = await bcrypt.compare(loginInput.password, user.password)
        if (user && result) {
            return { user: user, token: jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET_KEY) }
        }
        return {user:null,token:null}
        }
        catch (error) {
            
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

}