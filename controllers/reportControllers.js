import { success } from "zod";
import Transaction from "../models/transactionModel.js";

export const summary=async(req,res,next)=>{
 try {
       const transaction= await Transaction.find({
        createdBy:req.user._id
    })
    const income=transaction.filter(item=>item.type==='income').reduce((acc,t)=>acc+t.amount,0)
    const expense=transaction.filter(item=>item.type==='expense').reduce((acc,t)=>acc+t.amount,0)
    res.status(200).json({
        income,
        expense,
        blance:income - expense
    })
 } catch (error) {
    next(error)
 }


} 

//Monthly transaction report
export const monthlyReport = async (req, res, next) => {
  try {
    const monthlyReport = await Transaction.aggregate([
      {
        $match: {
          createdBy: req.user._id,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalIncome: {
            $sum: {
              $cond: [
                { $eq: ["$type", "income"] },
                "$amount",
                0,
              ],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [
                { $eq: ["$type", "expense"] },
                "$amount",
                0,
              ],
            },
          },
          totalTransaction: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      monthlyReport,
    });
  } catch (error) {
    next(error);
  }
};