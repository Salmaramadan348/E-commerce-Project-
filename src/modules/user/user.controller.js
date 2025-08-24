import bcrypt from"bcrypt";
import { userModel}from "../../../db/models/user.model.js"
import jwt from"jsonwebtoken"
import { sendMail } from "../../utilities/email/sendEmail.js"

const emailsAdmin=["salmaramadan348@gmail.com","salma.ramadan.mohammed@gmail.com"]
const isAdmin = (email) => emailsAdmin.includes(email);

const getUser = async (req, res) => {
  try {
    if (!isAdmin(req.user.email)) {
      return res.status(403).json({ message: "You don't have access to view all users" });
    }

    const users = await userModel.find();
    res.json({ message: "All users:", users });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



const postUser= async (req,res)=>{
    try{
       if (!isAdmin(req.user.email))return res.status(403).json({ message: "You don't have access to add user" });
        const addedUser= await userModel.insertMany(req.body)
        res.status(201).json({message:"user is added",addedUser})
    }
    catch(error){
        res.status(500).json({ message: "Server error", error });
    }
   
}
const updateUser=async(req,res)=>{
    try{
       if (!isAdmin(req.user.email))return res.status(403).json({ message: "You don't have access to update User" });
        const {id}=req.params
        const updatedUser=await userModel.findByIdAndUpdate(id,{...req.body},{new:true})
        res.json({message:"updated successful",updatedUser})
    }
    catch(error){
        res.status(500).json({ message: "Server error", error });
    }
    
}
const deleteUser=async (req,res)=>{
    try{
        if (!isAdmin(req.user.email))return res.status(403).json({ message: "You don't have access to delete user" });
        const {id}=req.params
        const deletedUser=await userModel.findByIdAndDelete(id)
        res.json({message:"deleted successful",deletedUser})
    }
    catch(error){
        res.status(500).json({ message: "Server error", error });
    }
}

const register=async(req,res)=>{
    try{
        req.body.password=bcrypt.hashSync(req.body.password,8)
    let role = "customer";
    if (emailsAdmin.includes(req.body.email)) {
      role = "admin";
    }
    //for insert the role if the role is admin
    const userData = { ...req.body, role };
    const addedUser=await userModel.insertMany(userData)
    sendMail(req.body.email)
    addedUser.password=undefined//for not return to user the password with the value
    res.json({message:"register is successful",addedUser})  
    }
    catch(error){
        res.status(500).json({ message: "Server error", error });
    }
     
}

const login =async(req,res)=>{
    try{
    const exist=await userModel.findOne({email:req.body.email})
    if(!exist){
        return res.json({message:"email or password invalid"})
    }
    const matchPass=bcrypt.compareSync(req.body.password, exist.password)
    if(!matchPass){
        res.json({message:"email or password invalid"})
}
    const token=jwt.sign({_id:exist._id,role:exist.role},"Day4")//sign for hash //verfiy for check //decode for not hash
    res.json({message:`welecome ${exist.userName}`,token})
    }
    catch(error){
        res.status(500).json({ message: "Server error", error });
    }
    
}

const verifyAccount= async(req,res)=>{
    try{
        let {email} =  req.params
     
       jwt.verify(email, "NTIG13Mail", async(err,decoded)=>{
        
        
           if(err) return res.json({message:"invalid token",err})
        await userModel.findOneAndUpdate({email:decoded.email}, {isConfirmed:true})
         res.json({message:"confirmed successfully"})
       })  

    }
    
       catch(error){
        res.status(500).json({ message: "Server error", error });
    }         
}
export{
    getUser,
    postUser,
    updateUser,
    deleteUser,
    register,
    login,
    verifyAccount,
    isAdmin
}