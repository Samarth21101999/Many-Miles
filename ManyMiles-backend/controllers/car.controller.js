
const Car=require('../models/Car');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const env=require('dotenv');
const { createSecretToken } = require('../utils/SecretToken');
env.config();

// @route POST /user/register
// @desc Register User
// @access Public
// Add Car
exports.addCar = async (req, res) => {
    const userId = req.userId._id;

    // const { make, model, year, color, licensePlate, photos, description, features, pricePerDay, location, availability, insurance, reviews, averageRating} = req.body;
    try {
        const car = new Car({
            ...req.body,
            owner: userId,   
        });
        await car.save();
        return res.status(200).json({msg:"Car Added Successfully", car});
    } catch (error) {
        console.log("Car Addition Failed", error);
        return res.status(500).json({msg:"Car Addition Failed"});
    }
}
exports.getAllCars = async (req, res) => {
    try {
      // Find all cars in the database
      const cars = await Car.find();
  
      // Return the cars as a JSON response
      res.status(200).json(cars);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve cars', error: error.message });
    }
  };