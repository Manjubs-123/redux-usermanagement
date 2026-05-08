import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"


export const adminLogin = async (req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})

        if(!user || !user.isAdmin){
            return res.status(401).json({message:"Not authorized as admin"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({message:'Invalid credentials'})
        }

        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }catch(error){
        res.status(500).json({message:error.message})
    }
}


export const getUsers = async(req,res)=>{
    try{
        const search = req.query.search||""
        const users = await User.find({
            name:{$regex:search,$options:"i"}
        }).select("-password")

        res.json(users)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}


export const createUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message:"User already exist"})
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })
        res.json(user)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}


export const updateUser = async (req,res)=>{
    try{
        const {name,email} = req.body
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        user.name = name|| user.name
        user.email = email||user.email

        const updatedUser = await user.save()
        res.json(updatedUser)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const deleteUser = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).json({message:"user not found "})
        }

        await user.deleteOne()

        res.json({message:"User delete successfully"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}