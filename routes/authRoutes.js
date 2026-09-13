import express from 'express'
import { getAuth, login, register } from '../controllers/authControllers.js'
import zodValidation from '../middlewares/zodValidation.js';
import authSchema from '../schema/authSchema.js';
const authRoutes=express.Router()


authRoutes.get('/getInfo',getAuth);
authRoutes.post('/register',zodValidation(authSchema),register)
authRoutes.post('/login',login)


export default authRoutes