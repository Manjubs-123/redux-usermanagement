import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const adminProtect = async (req,res,next)=>{
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            const user = await User.findById(decoded.id)

            if(!user.isAdmin){
                return res.status(403).json({message:"Admin access only"})
            }
            req.user = user
            next()
        }catch(error){
            res.status(401).json({message:"Token failed"})
        } 
    }else{
        res.status(401).json({message:"No token"})
    }
}

export default adminProtect