import express from "express"
import authController from "../controllers/authController.js";

const router = express.Router()

router.post("/register",authController.createUser)
router.post("/login",authController.loginUser)
router.post("/logout",authController.logoutUser)


export default router