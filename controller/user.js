import User from "../models/user.js";
export const getusers = async (req,res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: { users } });
  } catch (error) {
    next(error);
  }
};

export const getuser = async (req,res, next) => {
  try {
    const user= await User.findById(req.params.id).select('-password');

    if(!user)
    {
      const error=new Error('User Not Found')
      error.statuscode=404
      throw error
    }


    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};
