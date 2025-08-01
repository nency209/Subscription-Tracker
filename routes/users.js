import express from 'express'
import { getuser, getusers } from '../controller/user.js';
import { authorize } from '../middleware/auth.js';
var router = express.Router();

/* GET users listing. */
router.get("/",getusers);

router.get("/:id",authorize,getuser);


router.put("/:id", (req, res, next) => {
  res.send("respond with a resource", { title: "update user" });
  next();
});

router.delete("/:id", (req, res,) => {
  res.send("respond with a resource", { title: "delete user" });

});

export default router;
