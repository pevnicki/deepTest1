const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../model/user');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  let user
  try{
    await User.findOne({ username: req.body.username });
  }catch (e){
    res.status(500).send(e.message);
  }

  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['username', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id']));
});

module.exports = router; 
