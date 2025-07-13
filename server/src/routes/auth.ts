import express from "express"
import { loginPost, logoutPost, meGet, registerPost, verifyPost } from "../controllers/auth";
// import { requireAuth } from "../middlewares/authMiddleware";
// import { requireAuth } from "../middlewares/authMiddleware";
const router = express.Router()

router.get('/',(req,res)=>{
    res.json("hello from users auth")
})

router.post('/register',registerPost);
router.post('/verify',verifyPost);
router.post('/login',loginPost);
router.get('/me',meGet);
router.post('/logout',logoutPost);




export default router;