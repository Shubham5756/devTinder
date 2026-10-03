const mongoose = require("mongoose");
var validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new  mongoose.Schema({
  firstName: {
    type: String,
    required : true,
    unique : true,
    maxlength : 50,
  },
  lastName: {
    type: String,
    required : true,
    unique : true,
  },
  email: {
    type: String,
    required : true,
    unique : true,
    trim : true,
   
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("invalid email address " + value)
      }
    }
    
  },
  password: {
    type: String,
  },
  photoUrl : {
    type : String,
    default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBxbVSx0YbKyBuZ3JRWbQtL0SOrpVrBJKYUOEzmVl3GA&s=10"
  },
  age : {
    type : Number,
    min : 18,
    max : 50
  },
  gender : {
    type : String,
    validate(value){
      if(!['male' , 'female' , 'others'].includes(value)){
        throw new Error("gender data is not valid");
      }
    }
  },
  skills: {
    type : [String]
  }
 
},
 { timestamps : true,

  }
);



userSchema.methods.getJWT = async function(){
  const token = await jwt.sign({ id: this._id }, "dev@tinder$790" , { expiresIn: '1d' });
  return token;
}

userSchema.methods.validatePassword = async function(userInputPassword){
  return await bcrypt.compare(userInputPassword, this.password);
}
module.exports = mongoose.model("user", userSchema);

