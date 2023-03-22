import mongoose from "mongoose";

const gigSchema = mongoose.Schema({
    userId: {type:String,required:true},
    title: {type:String,required:[true,"Please add the title"]},
    desc: {type:String,required:[true,"Please add the description"]},
    totalStars: {type:Number,default:0},
    starNumber: {type:Number,default:0},
    category: {type:String,required:true},
    price: {type:String,required:true},
    coverImage: {type:String,required:true},
    images: {type:[String],required:false},
    shortTitle: {type:String,required:true},
    shortDesc: {type:String,required:true},
    deliveryTime: {type:Number,required:true},
    revisionNumber: {type:Number,required:true},
    features: {type:[String],required:false},
    sales: {type:Number,default:0},
},{
    timeStamps:true
})

const gigModel = mongoose.model("Gigs",gigSchema)

export default gigModel