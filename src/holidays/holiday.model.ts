import * as mongoose from 'mongoose'



export const HolidaySchema = new mongoose.Schema({
    start:{type:Date ,default:""},
    end:{type:Date ,default:""},
    type:{type:String,enum:["accident","annual"]},
    state:{type:String,enum:["accepted","refused","in process","in process (extend)","expired","refused (extend)","accepted (extend)"],default:"in process"},
    employee:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
})
