import mongoose from "mongoose";
const userSchema=new mongoose.Schema(
  {
  name:{
    type:String,
    required:[true,'user name is required'],
    trim:true,
    minLength:2,
    maxLength:50
  },
  email:{
    type:String,
    required:[true,'email is required'],
    unique:true,
    lowercase:true,
    match:[ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'enter email in valid format'],
    trim:true,
   
  },
  password:{
    type:String,
    required:[true,'password is required'],
    minLength:6,
  }

},{timestamps:true})


 export default mongoose.model('User',userSchema)