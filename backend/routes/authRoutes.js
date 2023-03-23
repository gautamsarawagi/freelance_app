import express from "express"
import authController from "../controllers/authController.js";
import {upload} from "../utils/fileUpload.js"

const router = express.Router()

router.post("/register",upload.single('img'),authController.createUser)
router.post("/login",authController.loginUser)
router.post("/logout",authController.logoutUser)


export default router