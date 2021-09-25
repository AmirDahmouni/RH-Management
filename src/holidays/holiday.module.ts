import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'
import { HolidaySchema } from "./holiday.model";
import { UserSchema } from "src/users/user.model";
import { HolidayResolver } from "./holiday.resolver";
import { HolidayService } from "./holiday.service";



@Module({
    imports: [MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
        { name: "Holiday",schema: HolidaySchema}
    ])],
    providers: [HolidayResolver,HolidayService]
    
})
export class HolidayModule {}