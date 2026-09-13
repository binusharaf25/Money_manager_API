import mongoose from "mongoose";

const authModel=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    role:{
        type:String,
        enam:['user','admin'],
        default:'user'
    }
        
    
})

const Auth=mongoose.model('Auth',authModel)
export default Auth