import mongoose from "mongoose";

export const dbConnetion =mongoose.connect('mongodb://localhost:27017/Project').then(()=>{
    console.log("db connected");
}).catch((err)=>{
    console.log(err);
})