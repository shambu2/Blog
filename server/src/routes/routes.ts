import express from "express";
const router = express.Router();
import usersRoutes from "./users"
import postRoutes from "./posts"
import authRoutes from "./auth"

router.use('/v1/user',usersRoutes)
router.use('/v1/post',postRoutes)
router.use('/v1/auth',authRoutes)


export default router;