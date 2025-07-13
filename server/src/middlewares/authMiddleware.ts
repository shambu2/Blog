// import { Request,Response,NextFunction } from "express";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// interface AuthenticatedRequest extends Request {
//   userId: string;
// }

// interface UserPayload {
//   id: string;
//   email: string;
//   name: string;
// }

// export const requireAuth =  (req:Request,res:Response,next:NextFunction)=>{
//     const token = req.cookies.token;
//     if(!token) return res.status(401).json({message: 'Please login with your account'})
    
//     try {
//         const decoded = jwt.verify(token,JWT_SECRET) as UserPayload;
        
//         req.userId = decoded.id;
//         next();
//     } catch (error) {
//         return res.status(401).json({message: "Invalid token"})
//     }    

// }