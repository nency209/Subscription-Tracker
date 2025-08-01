import mongoose from "mongoose";
import { DB_URL,} from "../config/env.js";

if (!DB_URL)
  throw new Error(
    "please define the mongodb_uri environmnet variable inside .env<developemnt/>producation>.local"
  );

const connectdb = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`database is connect`);
  } catch (error) {
    console.error("error connecting to database", error);
    process.exit(1);
  }
};

export default connectdb;
