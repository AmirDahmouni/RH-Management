import * as mongoose from 'mongoose'



export const UserSchema = new mongoose.Schema({

    admin: { type: Boolean, default: false },
    email:{type:String,required:true},
    telephone:{type:String,required:true},
    username: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    avatar:{type:String,required:false,default:""},
    holidays:[{type:mongoose.Schema.Types.ObjectId,ref:"Holiday"}],
    holiday:{type:Boolean,required:true,default:false},
    position:{type:String,enum:["developper","project manager","network administrator"," systems engineering manager","business analyst"]},
    departement:{type: String,enum : ['MOBILE','WEB','CLOUD',"UI/UX","BI","DEVOPS","IOT"],default: 'NEW'},
    work:{type:String,enum:["full remote","remote","office"],default:"office"}
})