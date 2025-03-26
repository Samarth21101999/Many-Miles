const jwt=require('jsonwebtoken');
const user=require('../models/User');
const dotenv=require('dotenv');
dotenv.config();

exports.auth=async(req,res,next)=>{
    let token;


    
    // Check if token is present in the header
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1];
    }
    
    // If token is not present
    if(!token){
       return res.status(401).json({msg:"Not Authorized to access this route"});
    }

    try{
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
        req.user=await user.findById(decoded.id);
        next();
    }
    catch(error){
        console.log("Token Verification Failed",error);
        return res.status(401).json({msg:"Not Authorized to access this route"});
    }
}