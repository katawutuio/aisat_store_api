const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authRouter = express.Router();

authRouter.post('/api/signup', async (req, res) => {
  try {
    const {fullName, email, password} = req.body;

    const existEmail = await User.findOne({email});

    if (existEmail) {
      return res.status(400).json({msg: "user email already exist"});
    } else {
      // generate a salt wit h a cost factor of 10
      const salt = await bcrypt.genSalt(10);
      // hash the password using the generated salt
      const hashedPassword = await bcrypt.hash(password, salt);
      var user = new User({fullName, email, password: hashedPassword});
      user = await user.save();
      return res.json({user});
    }
  } catch (e) {
    return res.status(500).json({error: e.message});
  }
});

authRouter.post('/api/signin', async (req, res) => {
  try {
    const {email, password} = req.body;
    const findUser = await User.findOne({email});

    if(!findUser) {
      return res.status(400).json({msg: "User not found with this email"});
    } else {
      // compare password
      const isMatch = await bcrypt.compare(password, findUser.password);

      if(!isMatch) {
        return res.status(400).json({msg: "Incorrect Password"});
      } else {
        // if authen pass generate token for user
        const token = jwt.sign({id:findUser._id}, "passwordkey")

        // แยก password (sensitive information) ออกจาก user information
        // ._doc คือ mongo document ในที่นี้คือ users 
        const {password, ...userWithoutPassword} = findUser._doc;      

        // send the response
        res.json({token, ...userWithoutPassword});
      }
    }
  } catch (error) {
    
  }
});

module.exports = authRouter;