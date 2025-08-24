import { userModel } from "../../db/models/user.model.js"

export const checkEmail=async(req,res,next)=>{
    const exist=await userModel.findOne({email:req.body.email})
    if(exist){
        return res.status(409).json({message:"user is already exist,please login"})
    }
    next()

}