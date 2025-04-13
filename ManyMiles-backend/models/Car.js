const mongoose = require('mongoose');
//CAR SCHEMA FOR THE DATABASE
/* FIELDS IN THE USER SCHEMA
    - Owner
    - make
    - model
    - year
    - licensePlate
    - photos
    - description
    - features
    - pricePerDay
    - location
        - type
        - coordinates
        - address
        - city
        - state
        - zipCode
    - availability
        - startDate
        - endDate
    - insurance
        - policyNumber
        - provider
        - coverageType
        - expiryDate
        - verified
    - reviews
        - user
        - rating
        - comment
    - averageRating
    - createdAt

 */
const CarSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  make: {
    type: String,
    required: [true, 'Please add the car make']
  },
  model: {
    type: String,
    required: [true, 'Please add the car model']
  },
  year: {
    type: Number,
    required: [true, 'Please add the car year']
  },
  licensePlate: {
    type: String,
    required: [true, 'Please add license plate number'],
    unique: true
  },
  images: [String],
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  features: [String],
  pricePerDay: {
    type: Number,
    required: [true, 'Please add a price per day']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    address: String,
    city: String,
    state: String,
    zipCode: String
  },
  availability: [{
    startDate: Date,
    startTime:String,
    endDate: Date,
    endTime: String
  }],
  insurance: {
    policyNumber: String,
    provider: String,
    coverageType: String,
    expiryDate: Date,
    verified: {
      type: Boolean,
      default: false
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Car', CarSchema);
