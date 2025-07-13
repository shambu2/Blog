import { Request, Response } from "express";
import { Post, User } from "../models/index.model";
export const postGetAll = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({ message: posts });
  } catch (error) {
    return res.status(500).json({ error: "error occured while fetching" });
  }
};
export const postCreate = async(req: Request, res: Response) => {
  const Id = req.userId;
  const { title, content, tags } = req.body;
  if (!title || !content || !Id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
   
    const NewPost = await Post.create({
        title,
        content,
        tags,
        author: name,
    });
    await NewPost.save();
    return res.status(201).json({message:"Post created ",NewPost})
  } catch (error) {
    return res.status(500).json({error:"Failed to create post"})
  }


};
export const postDelete = async(req: Request, res: Response) => {
  const Id = req.userId;
  const postId = req.params.id;

  if(!Id) return res.status(401).json("You dont have authorization")
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    return res.status(200).json({message:'Deleted Post successfully'})
  } catch (error) {
    return res.status(500).json({error:"Error occured while deleting"})
  }
};
export const postGet = async (req:Request,res:Response) => {
    const postId = req.params.id;
    if(!postId) return res.status(401).json({message:"Blog doesn't exists"})    
    try {
        const post  = await Post.findById(postId);
        
        return res.status(200).json({post} )
    } catch (error) {
        return res.status(500).json({error:'unable to fetch post'})
    }    
}