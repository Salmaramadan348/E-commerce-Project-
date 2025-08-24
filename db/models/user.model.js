import { time } from "console";
import { model, Schema } from "mongoose";
const userSchema=new Schema({
    email:{type:String,require:true},
    password:{type:String,require:true},
    userName:String,
    age:Number,
    role:{
        type:String,
        default:"customer",
        enum:["customer","admin"]
    },
    isConfirmed:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true,
    versionKey:false
})
export const userModel=model("user",userSchema)