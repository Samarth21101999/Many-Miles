const express=require('express');
const router=express.Router();
const {register, login, update, deleteUser}=require('../controllers/user.controller');

// Register User
router.post('/register',register);

router.get('/login',login);

router.patch('/update/:id',update);

router.delete('/delete/:id',deleteUser);
module.exports=router;