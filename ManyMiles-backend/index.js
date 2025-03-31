const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const connectDB=require('./config/db');
const userRoutes=require('./routes/user.route.js');

// config
dotenv.config();
const app=express();

//Middleware
app.use(cors({
    origin:"http://localhost:1234",
    credentials:true,
}));
app.use(express.json());

//Database Connection
connectDB();

// api routes
//1. User
app.use("/user",userRoutes);

app.listen(process.env.PORT || 5000,()=>{
    console.log("Server started at port 5000");
});
