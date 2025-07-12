import  { Request, Response } from "express"
import { User } from "../models/index.model";
import bcrypt from "bcrypt";
import { sendOTP } from "../utils/mailer";

export const registerPost = async(req:Request,res:Response)=>{
    const {email,name,password} = req.body;
    
    if(!email || !name || !password) return res.status(400).json({error: 'All fields are required'})
    
    const existing = await User.findOne({email});
    if(existing && existing.verified){
        return res.status(400).json({error: 'Email already verified'})
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedPassword = await bcrypt.hash(password,10)

    await User.findOneAndUpdate(
        {email},
        {$set:{name,email,password:hashedPassword,otp,verified:false}},
        {upsert: true, new: true}
    )

    await sendOTP(email,otp);

    return res.status(200).json({message: 'OTP sent to email'})


};

export const verifyPost = async(req:Request,res:Response)=>{
    const {email,otp} = req.body;
    if(!email || !otp) return res.status(400).json({error:'Missing fields'});

    const user = await User.findOne({email});
    if(!user || user.otp !== otp){
        return res.status(400).json({error: "Invalid OTP"})
    }

    user.verified = true;
    user.otp = undefined;
    await user.save();
    return res.status(200).json({message: 'Account verified successfully,Please login with your password'});
}








export const loginPost = (req:Request,res:Response)=>{
    res.json('hello login')
}
export const meGet = (req:Request,res:Response)=>{
    res.json('hello me')
}
export const logoutPost = (req:Request,res:Response)=>{
    res.json('hello logout')
}