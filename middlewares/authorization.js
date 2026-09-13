const authorized=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            res.status(402).json({
                message:`Access denied: you arent [${roles.join(',')}]`
            })
        }
        next()
    }
}

export default authorized