const { default: mongoose } = require("mongoose");
//USER SCHEMA FOR THE DATABASE
/* FIELDS IN THE USER SCHEMA
    -name
    - email
    - password
    - contactNo
    - driverLicense
        - number
        - expiryDate
        - verified
    - isCarOwner
    - reviews
        - user
        - rating
        - comment
    - averageRating
    - createdAt

 */
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
        ]
    },
    password:{
        type:String,
        requried:true,
        minLength:6,
        select:false
    },
    contactNo:{
        type:String,
        required:true,
        minLength:10,
        maxLength:10
    },
    driverLicense:{
        number:String,
        expiryDate:Date,
        verified:{type:Boolean,default:false}
    },
    isCarOwner:{
        type:Boolean,
        default:false
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
})

module.exports=mongoose.model('User',UserSchema);