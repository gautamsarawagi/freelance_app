import express from "express"
import gigController from "../controllers/gigController.js";
import protect from "../middleWares/authMiddleWare.js"
import {upload} from "../utils/fileUpload.js"

const router = express.Router()

// router.post("/create-gig", protect, upload.single("coverImage"),upload.array("images", 2), gigController.createGig)
router.post("/", protect, upload.single("coverImage"), gigController.createGig)
router.delete("/:gigId",protect,gigController.deleteGig)
router.get("/single/:gigId",protect,gigController.getSingleGig)
router.get("/",protect,gigController.getAllGigs)

export default router