import express from 'express'
import protect from '../middlewares/protect.js'
import { monthlyReport, summary } from '../controllers/reportControllers.js'

const reportRoutes=express.Router()


reportRoutes.get('/',protect,summary)
reportRoutes.get('/monthly',protect,monthlyReport)

export default reportRoutes