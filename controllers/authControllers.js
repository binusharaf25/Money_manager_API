import Auth from '../models/authModel.js'
import generateToken from '../utils/generateToken.js'

export const getAuth=async(req,res)=>{
    const getInfo= await Auth.find();
    res.json(getInfo)
}

//Register Section
export const register=async(req,res)=>{
    let {email}=req.body
    try {
        email=email.toLowerCase();
        const exist=await Auth.findOne({email});
        if(exist) return res.status(409).json({
            message:`This email already exist`,
            email:exist
        })
        const newAuth=await Auth.create({
            ...req.body
        })
        const token=generateToken(newAuth._id)
        res.status(201).json({
            message:'registration successed',
            info:newAuth,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            message:'Sever error',
            error:error.message
        })
    }
}


//Login section
export const login=async(req,res)=>{
    let {email,password} = req.body
    try {
        email=email.toLowerCase();
        const userEmail=await Auth.findOne({email});
        const userPassword=await Auth.findOne({password})
        if(!userEmail ){
            return res.status(404).json({
                message:'This email not found',
                email:userEmail
            })
        } 
        if(!userPassword){
            return res.status(404).json({
                message:'This password is wrong',
                password:password
            })
        }
        const token=generateToken(userEmail._id)
        res.status(200).json({
            message:'Login successed',
            email:userEmail,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            message:'Server error',
            error:error.message
        })
    }
}