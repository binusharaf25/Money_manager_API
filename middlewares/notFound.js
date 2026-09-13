const notFound=(req,res,next)=>{
    const error = new Error(`❌ Routes ${req.originalUrl} not found`)
    error.statusCode=500
    next(error)
    
}

export default notFound