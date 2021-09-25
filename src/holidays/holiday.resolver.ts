import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { UseGuards } from '@nestjs/common';
import  {GqlAuthGuard}  from 'src/auth/gql-auth.guard';
import { HolidayService } from './holiday.service';
import { HolidayType } from './types/holiday.type';
import {User} from "../users/types/user"
import {HolidayInput} from "../holidays/types/holiday.input"

@Resolver('Holiday')
export class HolidayResolver {

    constructor(private holidayService:HolidayService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(()=>HolidayType)
    holidayRequest(@Args("holidayInput") holidayInput:HolidayInput, @CurrentUser() user: User){
        const {start,end,type,state}=holidayInput;
        return this.holidayService.holidayRequest(user._id,start,end,type,state)
    }

    @Query(() => [HolidayType])
    HolidaysRequests() {
        return this.holidayService.getHolidaysRequests()
    }
    
    @UseGuards(GqlAuthGuard)
    @Query(()=>[HolidayType])
    MyHolidays(@CurrentUser() user: User)
    {
      return this.holidayService.getMyHolidays(user._id)
    }

    @Mutation(()=>HolidayType)
    acceptHoliday(@Args("holidayId") holidayId:string){
        return this.holidayService.acceptHoliday(holidayId)
    }
    @Mutation(()=>HolidayType)
    refusHoliday(@Args("holidayId") holidayId:string){
        return this.holidayService.refusHoliday(holidayId)
    }
    @Mutation(()=>HolidayType)
    expireHoliday(@Args("holidayId") holidayId:string)
    {
        return this.holidayService.expireHoliday(holidayId)
    }
    @Mutation(()=>HolidayType)
    deleteHoliday(@Args("holidayId") holidayId:string)
    {
        return this.holidayService.deleteHoliday(holidayId)
    }
    

}