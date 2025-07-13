import { Request,Response } from "express"
import { User } from "../models/index.model";
import bcrypt from "bcrypt"
export const usersGet = async(req:Request,res:Response)=>{
    const Id = req.params.id;

    try {
        const user = await User.findById(Id);
        return res.status(200).json({mesaage: user})
    } catch (error) {
        return res.status(500).json({error:"Error occured while getting user "})
    }


}
export const userPut = async(req:Request,res:Response)=>{
    const Id = req.userId;
    const {name,password,email} = req.body;
    const updates = req.body;

    const hashedPassword = await bcrypt.hashSync(password,10)

    try {
        const updatedUser = await User.findByIdAndUpdate(Id,
            {$set: {name:name,email:email,password:hashedPassword}},
            {new: true,runValidators:true}
        );
        if(!updatedUser) return res.status(404).json({error:'User not foundd'})
        return res.status(200).json({message:`User updated: ${updatedUser}`})

    } catch (error) {
        return res.status(500).json({error: 'server error'})
    }
};

export const userDelete = async(req:Request,res:Response)=>{
    const Id = req.userId;
    try {
        const deleteUser = await User.findByIdAndDelete(Id)
        return res.status(200).json({message:`User deleted successfully`})
    } catch (error) {
        return res.status(500).json({error: 'Error while deleting user'})
    }
}
