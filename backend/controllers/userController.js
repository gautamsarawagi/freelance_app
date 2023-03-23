import userModel from "../models/userModel.js"

class userController {
    static getUser = async (req,res,next) => {
        try {
            const user = await userModel.findById(req.params.id)

            if(user){
                const { _id, username, email, country, img, phone, desc, isSeller } = user
                res.status(200).json({_id, username, email, country, img, phone, desc, isSeller})
            }else{
                res.status(400)
                throw new Error("User Not Found")
            }
        } catch (error) {
            next(error)
        }
    }

    static deleteUser = async (req,res,next) => {
        try {
            const user = await userModel.findByIdAndDelete(req.user._id)
            
            if(user){
                res.status(200).json({message:"Successfully deleted your account"});
            }
        } catch (error) {
            next(error)
        }
    }
}

export default userController