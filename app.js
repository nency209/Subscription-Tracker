import express from 'express';
import cookieParser from 'cookie-parser';


import { PORT } from './config/env.js';
import indexRoutes from './routes/index.js'
import userRoutes from './routes/users.js'
import subscriptionRoutes from './routes/subscrption.js'
import connectdb from './config/db.js';
import errormiddleware from './middleware/errormiddleware.js';
import arjectmiddleware from './middleware/arcjet.js'
import workflow from './routes/workflow.js'


const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())




app.use('/api/index',indexRoutes)
app.use('/api/user',userRoutes)
app.use('/api/subscription',subscriptionRoutes)
app.use('/api/workflow',workflow)

app.use(errormiddleware)
app.use(arjectmiddleware)
connectdb()

console.log(PORT)
app.listen(PORT,()=>
{
  console.log(`server runnong on port http://localhost:${PORT}`)

})