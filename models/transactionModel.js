import mongoose from "mongoose";
import { number, string } from "zod";
import { required } from "zod/mini";

const transactionModel= new mongoose.Schema({
    title:{
        type:string,
        required:true
    },
    amount:{
        type:number,
        required:true
    },
    type:{
        type:string,
        enam:['income','expense'],
        required:true

    },
    category:{
        type:string,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Auth'
    }
})

const Transaction=mongoose.model('Transaction',transactionModel)
export default Transaction