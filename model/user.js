const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username : {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

userSchema.methods.generateAuthToken = function() {

  const token = jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'));
  console.log(token)
  return token;
}

const User = mongoose.model('User', userSchema);

const validateUser=(user)=> {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user,{ abortEarly: false });
}

exports.User = User; 
exports.validate = validateUser;
