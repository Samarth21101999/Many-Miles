const express=require('express');
const router=express.Router();
const {auth}=require('../middleware/auth');
const {addCar,getAllCars}=require('../controllers/car.controller');

// Add Car
router.post('/addCar',auth,addCar);
router.get('/getAllCars',auth,getAllCars);
module.exports=router;