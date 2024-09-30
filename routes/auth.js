const express = require('express');
const bcrypt = require('bcryptjs');
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

module.exports = authRouter;