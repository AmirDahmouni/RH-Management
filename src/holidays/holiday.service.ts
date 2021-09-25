import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import {Holiday} from "../holidays/types/holiday"
import {User} from "../users/types/user"
@Injectable()
export class HolidayService {

    constructor(@InjectModel('User') private UserModel: Model<User>,
    @InjectModel("Holiday") private HolidayModel:Model<Holiday> ) { }
    holidayRequest=async(userId:string,start:Date,end:Date,type:string,state:string)=>{
        try{     
           let holiday=new this.HolidayModel({start,end,type,state,employee:userId})
           holiday=await holiday.save()
           await this.UserModel.findByIdAndUpdate({_id:userId},{ $push: { holidays: holiday._id } })
           return holiday
        } 
        catch(error)
        {
           return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }   
    }
    getHolidaysRequests = async () => {
        try {
            const holidays = await this.HolidayModel.find({state: { $in: [ "in process","in process (extend)"] }}).populate("employee")
            return holidays;
        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    getMyHolidays=async(id:string)=>{
        try {
            const holidays = await this.HolidayModel.find({employee:id})
            return holidays;
        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    acceptHoliday=async(id:string)=>{
        try
        {
           let holiday=await this.HolidayModel.findById(id)                                                                                               
           if(holiday.state=="in process")
           {
              await this.HolidayModel.findOneAndUpdate({_id:id},{ $set: { state: "accepted" } }) 
              await this.UserModel.findByIdAndUpdate(holiday.employee,{$set:{holiday:true}})
              
           }
           else if(holiday.state=="in process (extend)")
            await this.HolidayModel.findOneAndUpdate({_id:id},{ $set: { state: "accepted (extend)" } }) 
           
           return await this.HolidayModel.findById(id).populate("employee")
           
        }
        catch(error)
        {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    refusHoliday=async(id:string)=>{
        try
        {
            let holiday=await this.HolidayModel.findById(id)  
            if(!holiday)  throw new HttpException('holiday not found', HttpStatus.NOT_FOUND)

            if(holiday.state=="in process")
              await this.HolidayModel.findOneAndUpdate({_id:id},{ $set: { state: "refused" } })
            else if(holiday.state=="in process (extend)")         
              await this.HolidayModel.findOneAndUpdate({_id:id},{ $set: { state: "refused (extend)" } }) 
           
              return await this.HolidayModel.findById(id).populate("employee")
        }
        catch(error)
        {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    expireHoliday=async(id:string)=>{
        try
        {
           let holiday=await this.HolidayModel.findOneAndUpdate({_id:id,state:"in process"},
                                                                  { $set: { state: "expired" } })                                                                                               
           if(holiday)
           {
              await this.UserModel.findByIdAndUpdate(holiday.employee,{$set:{holiday:false}})
              
              return await this.HolidayModel.findById(id).populate("employee")
           }
           throw new HttpException('holiday not found', HttpStatus.NOT_FOUND)
        }
        catch(error)
        {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }       
    }
    deleteHoliday=async(id:string)=>{
        try
        {
           let holiday=await this.HolidayModel.findById(id)
           if(holiday)
           {
              await this.HolidayModel.findByIdAndDelete(id)  
              await this.UserModel.findOneAndUpdate({_id:holiday.employee},{$set:{holiday:false},$pull:{holidays:holiday._id}})
              return holiday;
           }
           throw new HttpException('holiday not found', HttpStatus.NOT_FOUND)
        }
        catch(error)
        {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        } 
    }
}