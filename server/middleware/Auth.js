const catchAsyncErrors=require("../middleware/catchAsyncError.js") 
const { ErrorHandler } = require("./errorMiddleware.js")
const jwt=require("jsonwebtoken")
const User = require("../models/UserModel.js")

const isAdminAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.adminToken
    if(!token){
        return next(new ErrorHandler("Admin Not Authenticated",400));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user=await User.findById(decoded.id)
    if(req.user.role!=="Admin"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource`,403))
    }
    next();
})

const isPatientAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.patientToken   
    if(!token){
        return next(new ErrorHandler("Patient Not Authenticated",400));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user=await User.findById(decoded.id)
    if(req.user.role!=="Patient"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource`,403))
    }
    next();
})

module.exports={isAdminAuthenticated,isPatientAuthenticated}
