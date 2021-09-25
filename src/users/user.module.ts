import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './user.model'
import { HolidaySchema } from "../holidays/holiday.model"
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { AuthService } from "src/auth/auth.service";


@Module({
    imports: [MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
        { name: "Holiday",schema: HolidaySchema}
    ])],
    providers: [ AuthService,UserService,UserResolver]
    //exports:[UserService]
})
export class UserModule {}