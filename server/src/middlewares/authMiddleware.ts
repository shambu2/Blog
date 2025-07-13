import { Request,Response,NextFunction } from "express";
import jwt,{JwtPayload} from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "SECRET";
import dotenv from "dotenv";
dotenv.config()
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
interface UserPayload {
  id: string;
  email: string;
  name: string;
}
// interface TokenPayload extends JwtPayload {
//     id: string; // Use 'id' to match the decoded property in the middleware
// }


export const infoMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies.token;
    if(!token) return res.status(400).json({error:"Please login"})
    try {
        const decoded = jwt.verify(token,JWT_SECRET) as UserPayload;
        const decodedId = decoded.id ;
        req.userId = decodedId;
        next()
    } catch (error) {
        return res.status(401).json({error: 'Unauthorized: invalid token'})
    }    
}
