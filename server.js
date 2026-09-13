import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'


//All importing  routes
import authRoutes from './routes/authRoutes.js'
import adminDashboard from './routes/adminDashboard.js'
import transactionRoutes from './routes/transactionRoutes.js'
import reportRoutes from './routes/reportRoutes.js'



//importing errors
import logger from './middlewares/logger.js'
import notFound from './middlewares/notFound.js'
import globalError from './middlewares/globalError.js'
import limit from './middlewares/rateLimit.js'
import helmet from 'helmet'
import { swaggerUi, specs } from "./utils/swager.js";




const app=express()
dotenv.config()
const PORT=process.env.PORT
app.use(express.json())


//Logger middlewares
app.use(logger)
app.use(limit)
app.use(helmet())

//swager documemtation
app.use(
      "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
)


//registering auth routes
app.use('/auth',authRoutes)


//admin Dashboard
app.use('/admin',adminDashboard)
app.use('/server',(req,res)=>{
    res.send('Hello sevre in node js')
})

//transections
app.use('/transaction',transactionRoutes)
app.use('/reports',reportRoutes)





//Global  middlewares
app.use(notFound)
app.use(globalError)





//Ruunning server
app.listen(PORT,()=>console.log(`Our server running in port ${PORT}`))

//MongoDb Connection
mongoose.connect(process.env.NODE_ENV==='development'?process.env.MONGO_URI_DEV:process.env.MONGO_URI_PRO)
    .then(()=>console.log('✅ DB connection success'))
    .catch((err)=>console.log('❌ DB connection failed'));