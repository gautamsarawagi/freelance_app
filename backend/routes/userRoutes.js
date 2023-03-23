import express from "express"
import userController from "../controllers/userController.js"
import protect from "../middleWares/authMiddleWare.js"

const router = express.Router()

router.get("/:id",userController.getUser)
router.post("/delete",protect,userController.deleteUser)

export default router