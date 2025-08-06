import mongoose from "mongoose";

const subscriptionSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  name:String,
  price:Number,
  frequency:{
    type:String,
    enum:["monthly","yearly"],
    default:"monthly"
  },
  startDate:
  {
    type:Date,
    default:Date.now
  },
  email:{
    type:String,
    required:[true,'email is required'],
    unique:true,
    lowercase:true,
    match:[ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'enter email in valid format'],
    trim:true,
   
  },


})

export default mongoose.model("Subscription",subscriptionSchema)