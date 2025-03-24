const { default: mongoose } = require("mongoose");
const dotenv=require('dotenv');
dotenv.config();
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,{
           
        }).then(()=>{
            console.log("DB CONNECTED");
        }).catch((err)=>{
            console.log("DB CONNECTION FAILED",err);
        });
        
    }catch(error){
        console.log("DB CONNECTION FAILED",error);
        process.exit(1);
    }
}
        
module.exports = connectDB;
