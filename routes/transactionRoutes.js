import express from 'express'
import { addTransaction, deleteTransaction, getTransaction, singleTransaction, updateTransaction } from '../controllers/transactionControllers.js'
import protect from '../middlewares/protect.js'
const transactionRoutes=express.Router()

transactionRoutes.get('/',getTransaction)
transactionRoutes.get('/single/:id',protect,singleTransaction)
transactionRoutes.post('/create',protect,addTransaction)
transactionRoutes.put('/:id',protect,updateTransaction)
transactionRoutes.delete('/delete/:id',protect,deleteTransaction)

export default transactionRoutes