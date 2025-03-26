
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const env=require('dotenv');
env.config();

// @route POST /user/register
// @desc Register User
// @access Public
//Register User
exports.register = async (req, res) => {
    try{
        const {name,email,password,contactNo} = req.body;

    // check if user exists
    
    const existinguser=await User.findOne({email});
    
    if(existinguser){
        return res.status(400).json({msg:"User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds


    // create user
    const user=new User({
        name,
        email,
        password:hashedPassword, 
        contactNo
    });
    
    await user.save();
    
    return res.status(200).json({msg:"User Registered Successfully"});

    }catch(error){
        console.log("User Registration Failed",error);
        return res.status(500).json({msg:"User Registration Failed"});
    }
};


// @route GET /user/login
// @desc Login User
// @access Public
exports.login = async (req, res) => {
    try{
        const {email,password}=req.body;
        
        // check if user exists
        const user=await User.findOne({email});
       
        // If user does not exist, return an error
        if(!user){
            return res.status(400).json({msg:"User does not exist"});
        }

        // check if password is correct
        const isMatch=await bcrypt.compare(password,user.password);

        // create token
        const accessToken=jwt.sign(JSON.stringify(user),process.env.ACCESS_TOKEN_SECRET);
        
        // If password is correct, return the token
        if(isMatch){
            return res.status(200).json({msg:"User Logged In Successfully",accessToken});
        }else{
            return res.status(400).json({msg:"Invalid Credentials"});
        }
    }catch(error){
        console.log("User Login Failed",error);
        return res.status(500).json({msg:"User Login Failed"});
    }
};

// @route GET /user/login
// @desc Login User
// @access Public
exports.getUser=async (req,res) => {
    try{
        const user=await User.findById(req.params.id).select('-password');
        if(!user){
            return res.status(404).json({msg:"User Not Found"});
        }
        return res.status(200).json({msg:"User Found",user});
    }catch(error){
        console.log("User Fetch Failed",error);
        return res.status(500).json({msg:"User Fetch Failed"});
    }
}

// @route PATCH /user/update/:id
// @desc Update User
// @access Public
exports.updateUser=async (req,res) => {
    try{          
        
        // Only allow specific fields to be updated
        const updateField={};
        const allowedFields=["name","email","password","contactNo","driverLicense","isCarOwner"];
        
        // Dynamically add only the fields present in the request  
        allowedFields.forEach(field=>{
                if(req.body[field]){
                    updateField[field]=req.body[field];
                }
            });
        // If no fields are being updated, return an error
        if(Object.keys(updateField).length===0){
            return res.status(400).json({msg:"No fields to update"});
        }

        // If password is being updated, hash it before saving
        if(updateField.password){
            updateField.password=await bcrypt.hash(updateField.password, 10);
        }
         // Find the user by ID and update only the allowed fields
        const user=await User.findByIdAndUpdate(req.params.id, {$set: updateField} , {new:true, runValidators:true}).select('-password');
        if(!user){
            return res.status(404).json({msg:"User Not Found"});
        }
        return res.status(200).json({msg:"User Updated Successfully",user});
    
    }catch(error){
        console.log("User Update Failed",error);
        return res.status(500).json({msg:"User Update Failed"});
    }
}

// @route DELETE /user/delete/:id
// @desc Delete User
// @access Public
exports.deleteUser=async (req,res) => {
    try{
        console.log(req.params.id);
        const userId = req.params.id;

        // Find the user first to validate password
        const user = await User.findById(userId);

        console.log(user);
        if (!user) {
            return res.status(404).json({ msg: "User does not exist" });
        }
    
        const deletedUser = await User.findByIdAndDelete(userId);

        return res.status(200).json({msg:"User Deleted Successfully"});

    }catch(error){
        console.log("User Deletion Failed",error);
        return res.status(500).json({msg:"User Deletion Failed"});
    }
}