const dotenv=require('dotenv');
dotenv.config();
const jwt=require('jsonwebtoken');

module.exports.createSecretToken=(id)=>{
    return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'3d'});
}