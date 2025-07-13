import { NextFunction, Request, Response } from "express";
import { User } from "../models/index.model";
import bcrypt from "bcrypt";
import { sendOTP } from "../utils/mailer";
// import { Jwt } from "jsonwebtoken";
import jwt from "jsonwebtoken";
interface UserPayload {
  id: string;
  email: string;
  name: string;
}

// declare global {
//   namespace Express {
//     interface Request {
//       userId?: string;
//     }
//   }
// }

// interface AuthenticatedRequest extends Request{
//     userId: string;
// }

// type AuthenticatedHandler = (req:AuthenticatedRequest,res:Response,next?:NextFunction) => void | Promise<void>;

const JWT_SECRET = process.env.JWT_SECRET || "SECRET";

export const registerPost = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password)
    return res.status(400).json({ error: "All fields are required" });

  const existing = await User.findOne({ email });
  if (existing && existing.verified) {
    return res.status(400).json({ error: "Email already verified" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    { email },
    { $set: { name, email, password: hashedPassword, otp, verified: false } },
    { upsert: true, new: true }
  );

  await sendOTP(email, otp);

  return res.status(200).json({ message: "OTP sent to email" });
};

export const verifyPost = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: "Missing fields" });

  const user = await User.findOne({ email });
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

export const loginPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Enter valid credentials" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }
  const comparedPassword = await bcrypt.compareSync(password, user.password);
  if (!comparedPassword)
    return res.status(400).json({ message: " Enter correct password" });

  const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
    expiresIn: "25d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 25 * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({ message: `Login successful ${user} `});
};

export const meGet = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ message: "Please login with your account" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;

    const Id = decoded.id;
    // const ids = Id.toString();
    // req.userId = "12fgsd" 
    //  req.userId = "234gfd"
    if (!Id) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(Id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.name,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const logoutPost = (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({error:"Error occured while logout"})
  }
};
