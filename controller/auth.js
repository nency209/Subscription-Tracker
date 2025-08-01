import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { JWT_SECRET, EXPIREDIN } from "../config/env.js";

export const signup = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;
    const existuser = await User.findOne({ email });
    if (existuser) {
      const error = new Error("user alraedy exists");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const newuser = await User.create(
      [{ name, email, password: hashedpassword }],
      { session }
    );

    const token = Jwt.sign({ userId: newuser.id }, JWT_SECRET, {
      expiresIn: EXPIREDIN || "7d",
    });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      sucess: true,
      message: "sucessfully add user",
      data: {
        token,
        User: newuser,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signin = async (req, res,  next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User Not Found");
      error.statusCode = 404;
      throw error;
    }

    const ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      throw error;
    }

    const token = Jwt.sign({ userId: user._id },JWT_SECRET, {
      expiresIn: EXPIREDIN || "7d",
    });
    res.status(200).json({
      sucess: true,
      message: "sucessfully  user SIGNIN SUCESSFULLY",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signout = async () => {};
