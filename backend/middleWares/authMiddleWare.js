import  jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"

const protect = async (req,res,next) => {
    try {
        const token  = req.cookies.token

    if(!token){
        res.status(401)
        throw new Error("User not authorized")
    }

    const verified = jwt.verify(token,process.env.JWT_SECRET)

    const user = await userModel.findById(verified.id).select("-password")

    if(!user){
        res.status(401)
        throw new Error("User not found")
    }
    req.user = user
    next()
    } catch (error) {
        next(error)
    }

}

export default protect