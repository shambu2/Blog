import express from "express"
import { postCreate, postDelete, postGet, postGetAll } from "../controllers/posts"
import { infoMiddleware } from "../middlewares/authMiddleware"
const router = express.Router()

router.get('/all',postGetAll)

router.post('/new',infoMiddleware,postCreate)
router.delete('/delete/:id',infoMiddleware,postDelete)
router.get('/:id',postGet)


export default router;