import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    gigId: {type: String,required: true},
    userId: {type: String,required: true,},
    star: {type: Number,required: true,enum:[1,2,3,4,5]},
    desc: {type: String,required: true,},
  },
  {
    timeStamps: true,
  }
);

const riviewModel = mongoose.model("Reviews", reviewSchema);

export default riviewModel;
