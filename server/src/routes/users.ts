import express from "express"
import { userDelete, userPut, usersGet } from "../controllers/user"
import { infoMiddleware } from "../middlewares/authMiddleware"
const router = express.Router()

router.get('/:id',usersGet)
router.put('/update',infoMiddleware,userPut)
router.delete('/delete',infoMiddleware,userDelete)

export default router;