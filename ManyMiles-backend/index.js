const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const connectDB=require('./config/db');
const userRoutes=require('./routes/user.route.js');
const carRoutes=require('./routes/car.routes.js');
// config
dotenv.config();
const app=express();

//Middleware
const corsOptions = {
    origin: 'http://localhost:1234', // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Include PATCH here
    allowedHeaders: ["Content-Type", "Authorization", 'WithCredentials'],
    credentials: true, // If you need credentials (e.g., cookies)
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to handle preflight requests (OPTIONS method)
app.options('*', cors(corsOptions));
app.use(express.json());

//Database Connection
connectDB();

app.use(cookieParser());
// api routes
//1. User
app.use("/user",userRoutes);
//2. Car
app.use("/car",carRoutes);

app.listen(process.env.PORT || 5000,()=>{
    console.log("Server started at port 5000");
});
