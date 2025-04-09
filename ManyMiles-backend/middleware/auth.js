const jwt=require('jsonwebtoken');
const user=require('../models/User');
const dotenv=require('dotenv');
dotenv.config();

exports.auth=async(req,res,next)=>{
    const token=req.cookies.accessToken;
    console.log("Token",token);
    if(!token){
        return res.json({status:false});
    }
    try{

    
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,async(err,decoded)=>{
        
        
        if(err){
            return res.json({status:false});
        }
        req.userId=await user.findById(decoded.id);
        next();
        }
    )}
    catch(error){
        console.log("Token Verification Failed",error);
        return res.status(401).json({msg:"Not Authorized to access this route"});
    }

    
    // // Check if token is present in the header
    // if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    //     token=req.headers.authorization.split(" ")[1];
    // }
    
    // // If token is not present
    // if(!token){
    //    return res.status(401).json({msg:"Not Authorized to access this route"});
    // }

    // try{
    //     const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
    //     req.user=await user.findById(decoded.id);
    //     next();
    // }
    
}