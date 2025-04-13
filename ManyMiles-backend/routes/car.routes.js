const express=require('express');
const router=express.Router();
const {auth}=require('../middleware/auth');
const {addCar,getAllCars,getCarById,getCarByUserId}=require('../controllers/car.controller');
const upload = require('../config/upload');

// Add Car
router.post('/addCar',auth,upload.array('images',5),addCar);
router.get('/getAllCars',auth,getAllCars);
router.get('/getCar/:id',auth,getCarById);
module.exports=router;