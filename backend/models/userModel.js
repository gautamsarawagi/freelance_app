import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
    username: {type:String,required:[true,"Please add the Name"],unique:true},
    email: {type:String,required:[true,"Please add the email"],unique:true,trim:true,match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please add  a valid email"]},
    password:{type:String,required:[true,"Please enter the password"],minLength:[6,"Password must be up to 6 characters"]},
    img: {type:String,default:"https://i.ibb.co/4pDNDk1/avatar.png"},
    country: {type:String,required:[true,"Please add the Country Name"]},
    phone: {type:String,required:false,default:"+91"},
    isSeller: {type:Boolean,default:false},
    desc: {type:String,required:[true,"Please add the bio"],default:"bio",maxLength:[250,"Bio must not exceed 250 characters"]},},{
        timeStamps:true
    })

    userSchema.pre("save", async function (next) {

        if (!this.isModified("password")) {
            return next();
        }
    
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(this.password,salt);
        this.password = hashedPassword
        next()
    })
    
const userModel = mongoose.model("User",userSchema)

export default userModel