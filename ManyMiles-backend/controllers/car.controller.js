
const Car=require('../models/Car');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const env=require('dotenv');
const { createSecretToken } = require('../utils/SecretToken');
const  uploadToSupabase  = require('../config/uploadToSupabase');
const {DateTime} = require('luxon');
env.config();

// @route POST /user/register
// @desc Register User
// @access Public
// Add Car
exports.addCar = async (req, res) => {
  console.log("Add Car Request", req.body);
    const userId = req.userId._id;
    console.log("Files received", req.files);
    let imageUrls = [];
    if(req.files && req.files.length > 0) {
      imageUrls=await uploadToSupabase(req.files);
      console.log("Image URLs", imageUrls);
      if(!imageUrls) {
        return res.status(500).json({msg:"Image Upload Failed"});
      }
    }
    const location = JSON.parse(req.body.location);
    const insurance = JSON.parse(req.body.insurance);
    
    // Convert availability dates and times to UTC
    let availability = JSON.parse(req.body.availability);
    
    availability = availability.map(item => {
      // Parse the start date and time
      const startDateTime = DateTime.fromISO(item.startDate)
          .set({ hour: parseInt(item.startTime.split(":")[0]), minute: parseInt(item.startTime.split(":")[1]) })
          .setZone('America/New_York')  // Adjust the time zone to the user's, if needed
          .toUTC();  // Convert to UTC

      // Parse the end date and time
      const endDateTime = DateTime.fromISO(item.endDate)
          .set({ hour: parseInt(item.endTime.split(":")[0]), minute: parseInt(item.endTime.split(":")[1]) })
          .setZone('America/New_York')  // Adjust the time zone
          .toUTC();  // Convert to UTC

      return {
          startDate: startDateTime.toJSDate(),
          startTime: item.startTime, // Keep the original time string for display purposes
          endDate: endDateTime.toJSDate(),
          endTime: item.endTime, // Keep the original time string for display purposes
      };
  });

    
    // const { make, model, year, color, licensePlate, photos, description, features, pricePerDay, location, availability, insurance, reviews, averageRating} = req.body;
    try {
      



        const car = new Car({
            ...req.body,
            location,
            availability: availability,
            images: imageUrls,
            owner: userId,   
            insurance

        });


        await car.save();
        return res.status(200).json({msg:"Car Added Successfully", car});
    } catch (error) {
        console.log("Car Addition Failed", error);
        return res.status(500).json(error.errorResponse.keyValue);
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

  exports.getCarById = async (req, res) => {
    const carId = req.params.id;
    try {
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({msg:"Car Not Found"});
        }
        return res.status(200).json(car);
    } catch (error) {
        console.log("Car Retrieval Failed", error);
        return res.status(500).json({msg:"Car Retrieval Failed"});
    }
  }
