import { ne } from "zod/locales";
import Auth from "../models/authModel.js";
import Transaction from "../models/transactionModel.js";

export const getTransaction=async(req,res)=>{
    const findAll= await Transaction.find()
    res.json(findAll)
}

//Single Transaction

export const singleTransaction=async(req,res,next)=>{

    const {id}=req.params
    try {
        const singleTransaction=await Transaction.findById(id)
        if(!singleTransaction) return res.status(404).json({
            message:`This transaction id ${id} not found`
        })
        res.status(200).json({
            singleTransaction:singleTransaction
        })
    } catch (error) {
        next(error)
    }
}

//Adding new Transaction
export const addTransaction=async(req,res,next)=>{
    try {
        const newTransaction= await Transaction.create({
            ...req.body,
            createdBy:req.user._id
        })
        res.status(201).json({
            message:'New transaction succesful created',
            transaction:newTransaction
        })
        
    } catch (error) {
        next(error)
    }
}

//Update Tansaction
export const updateTransaction=async(req,res,next)=>{
    const {id}=req.params
    try {
        const updatedTransaction=await Transaction.findByIdAndUpdate(
            {_id:id,createdBy:req.user._id},
            req.body,
            {new:true}
        )
        if(!updatedTransaction) return res.status(404).json({
            message:`This transaction id ${id} not found`
        })
        res.status(200).json({
            message:`This transaction id ${id} updated`,
            updated:updatedTransaction
        })
        
    } catch (error) {
        next(error)
    }
}

//Delete Transaction
export const deleteTransaction=async(req,res,next)=>{
    const {id}=req.params
    try {
        const deletedTransaction= await Transaction.findByIdAndDelete(id)
        if(!deletedTransaction) return res.status(404).json({
            message:`This transactio id ${id} not found`
        })
        res.status(200).json({
            message:`This transaction id ${id} deleted`,
            Deleted:deletedTransaction
        })
    } catch (error) {
        next(error)
    }
}