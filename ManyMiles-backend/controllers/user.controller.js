
const User=require('../models/User');
const bcrypt=require('bcryptjs');


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