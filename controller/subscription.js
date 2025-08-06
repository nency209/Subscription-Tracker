import Subscription from "../models/subscription.js";
import { sendSubscriptionEmail } from "../utils/emailservices.js";


export const addsubscription=async(req,res,next)=>{
  const {name,price,startDate,frequency,email}=req.body;

  try{
      const subdata=await Subscription.create({
        userId:req.user._id,
        ...req.body
      })

      await sendSubscriptionEmail(email,name,price,startDate,frequency);
      res.status(201).json({
        success:true,
        message:"Subscription added successfully",
        data:subdata
      })
  }
  catch(error){
    next(error)
  }
}