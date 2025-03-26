const express=require('express');
const router=express.Router();
const {register, login, updateUser, deleteUser, getUser}=require('../controllers/user.controller');
const {auth}=require('../middleware/auth');
// Register User
router.post('/register',register);

router.get('/login',login);

router.get('/profile/:id',auth,getUser);
router.patch('/update/:id',auth,updateUser);

router.delete('/delete/:id',auth,deleteUser);
module.exports=router;