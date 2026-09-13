import express from 'express'
import protect from '../middlewares/protect.js'
import authorized from '../middlewares/authorization.js';
const adminDashboard=express.Router()


adminDashboard.get('/dashboard',protect,authorized('admin'),(req,res)=>{
    console.log('req user: ',req.user);
    res.send('Welcome to admin dashboard')
})

adminDashboard.get('/protected',protect,(req,res)=>{
    res.send('Welecome to protected Dashboard')
})
export default adminDashboard