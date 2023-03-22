import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    conversationId: {type:String,required:true,},
    userId: {type:String,required:true},
    desc:{type:String,required:true},
},{
    timeStamps:true
})

const messageModel = mongoose.model("Messages",messageSchema)

export default messageModel