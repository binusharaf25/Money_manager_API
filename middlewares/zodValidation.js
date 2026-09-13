import {object} from 'zod'


const zodValidation=(schema)=>(req,res,next)=>{
    const result=schema.safeParse(req.body)
    if(!result.success){
        const formatted=result.error.format();
        
        res.status(400).json({
            success:false,
            message:'Validation failed',
            errors:Object.keys(formatted).map(fields=>({
                message:formatted[fields]?._errors?.[0] || 'Invalid input'
            }))
        })
    }
    next()
}

export default zodValidation