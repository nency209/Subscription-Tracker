import express from 'express'
import { signin, signout, signup } from '../controller/auth.js';
var router = express.Router();

/* GET home page. */
router.post('/signup',signup);

router.post('/signin',signin)

router.post('/signout',signout)

export default router;
