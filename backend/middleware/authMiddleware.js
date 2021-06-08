const asyncHandler = require('express-async-handler')
const jwt=require('jsonwebtoken')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try{
            token = req.headers.authorization.split(' ')[1]
            // console.log(req.headers.authorization)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        }catch(error){
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const admin=async(req,res,next)=>{
    if(req.user&&req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

module.exports = {protect,admin}