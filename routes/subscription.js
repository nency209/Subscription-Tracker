import express from "express";
const route=express.Router();
import { addsubscription } from "../controller/subscription.js";
import { authorize } from "../middleware/auth.js";

route.post('/:id',authorize,addsubscription);

export default route;