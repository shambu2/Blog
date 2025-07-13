"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutPost = exports.meGet = exports.loginPost = exports.verifyPost = exports.registerPost = void 0;
const index_model_1 = require("../models/index.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailer_1 = require("../utils/mailer");
// import { Jwt } from "jsonwebtoken";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// interface AuthenticatedRequest extends Request{
//     userId: string;
// }
// type AuthenticatedHandler = (req:AuthenticatedRequest,res:Response,next?:NextFunction) => void | Promise<void>;
const JWT_SECRET = process.env.JWT_SECRET || "SECRET";
const registerPost = async (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password)
        return res.status(400).json({ error: "All fields are required" });
    const existing = await index_model_1.User.findOne({ email });
    if (existing && existing.verified) {
        return res.status(400).json({ error: "Email already verified" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    await index_model_1.User.findOneAndUpdate({ email }, { $set: { name, email, password: hashedPassword, otp, verified: false } }, { upsert: true, new: true });
    await (0, mailer_1.sendOTP)(email, otp);
    return res.status(200).json({ message: "OTP sent to email" });
};
exports.registerPost = registerPost;
const verifyPost = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp)
        return res.status(400).json({ error: "Missing fields" });
    const user = await index_model_1.User.findOne({ email });
    if (!user || user.otp !== otp) {
        return res.status(400).json({ error: "Invalid OTP" });
    }
    user.verified = true;
    user.otp = undefined;
    await user.save();
    return res.status(200).json({
        message: "Account verified successfully,Please login with your password",
    });
};
exports.verifyPost = verifyPost;
const loginPost = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Enter valid credentials" });
    }
    const user = await index_model_1.User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }
    const comparedPassword = await bcrypt_1.default.compareSync(password, user.password);
    if (!comparedPassword)
        return res.status(400).json({ message: " Enter correct password" });
    const token = jsonwebtoken_1.default.sign({ id: user._id.toString() }, JWT_SECRET, {
        expiresIn: "25d",
    });
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 25 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Login successful" });
};
exports.loginPost = loginPost;
const meGet = async (req, res) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({ message: "Please login with your account" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const Id = decoded.id;
        // const ids = Id.toString();
        req.userId = "12fgsd";
        if (!Id)
            return res.status(401).json({ message: "Unauthorized" });
        const user = await index_model_1.User.findById(Id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        return res.status(200).json({
            id: user._id,
            email: user.email,
            username: user.name,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
exports.meGet = meGet;
const logoutPost = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });
        return res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Error occured while logout" });
    }
};
exports.logoutPost = logoutPost;
