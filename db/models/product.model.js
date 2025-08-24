import { Schema,model } from "mongoose";


const productSchema=new Schema({
    name:{type:String,require:true},
    description:String,
    price:{type:Number,require:true},
    quantity:Number,
    brandName:String,
    ratings:[
        {
        userId:{type:Schema.Types.ObjectId,ref:"user"},
        rating:{type:Number,min:0,max:5},
        Comment:String
         }
    ],
    discount:{type:Number,default:0}

},
{
    timestamps:true,
    versionKey:false,
})
export const productModel=model("product",productSchema)