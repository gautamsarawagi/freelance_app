import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    id: {type:String,required:true,unique:true},
    sellerId: {type:String,required:true},
    buyerId: {type:String,required:true},
    readbySeller: {type:Boolean,default:true},
    readbyBuyer: {type:Boolean,default:true},
    lastMessage: {type:String,required:false},
},{
    timeStamps:true
})

const conversationModel = mongoose.model("Conversation",conversationSchema)

export default conversationModel