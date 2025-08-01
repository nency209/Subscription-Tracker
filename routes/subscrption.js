import express from 'express'
import { authorize } from '../middleware/auth.js'
import {getusersubscription, subscription } from '../controller/subscription.js'

var router=express.Router()

router.get('/',)

router.post('/',authorize,subscription)

router.get('/user/:id',authorize,getusersubscription)


router.put('/:id',(req,res,next)=>
{
  res.send('',{title:'get user subscription'})
  next()
})

router.delete('/:id',(req,res,next)=>
{
  res.send('',{title:'user delete subscription'})
  next()
})

router.get('/:id',(req,res,next)=>
{
  res.send('',{title:'get user subscription'})
  next()
})

router.get('/:id/cancel',(req,res,next)=>
{
  res.send('',{title:'cancel subscription'})
  next()
})

export default  router;