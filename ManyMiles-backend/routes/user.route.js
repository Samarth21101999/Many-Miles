const express=require('express');
const router=express.Router();
const {register, login, updateUser, deleteUser, getUser, verifyUser}=require('../controllers/user.controller');
const {auth}=require('../middleware/auth');

// router.post('/',auth);

// Register User
router.post('/register',register);

router.post('/login',login);
router.post("/verify",auth,verifyUser);
router.get('/profile',auth,getUser);
router.patch('/update',auth,updateUser);

router.delete('/delete',auth,deleteUser);
module.exports=router;