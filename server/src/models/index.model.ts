import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    verified: {
        type: Boolean
    }
},{timestamps: true})

export const User = mongoose.model("User",userSchema)

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content:{
        type: String
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    tags: [String]

},{timestamps: true})

export const Post = mongoose.model("Post",postSchema)
