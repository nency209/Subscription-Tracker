import Subscription from "../models/supscription.js";

export const subscription = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getusersubscription=async(req,res,next)=>
{
  try
  {
    if(req.user.id != req.params.id)
    {
      const error=new Error('you are not the owner of this account')
      error.status=401
      throw error;
    }

    const subscriptions=await Subscription.find({user:req.params.id})
    res.status(200).json({
      success:true,
      data:subscriptions
    })
  }

  catch(error)
  {
        next(error)
  }
}
