import rateLimit from "express-rate-limit";


const limit=rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:'Too many request, please try again later'
})

export default limit