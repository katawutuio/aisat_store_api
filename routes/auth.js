const express = require('express');
const User = require('../models/user');

const authRouter = express.Router();

authRouter.post('/api/signup', async (req, res) => {
  try {
    const {fullName, email, password} = req.body;

    const existEmail = await User.findOne({email});

    if (existEmail) {
      return res.status(400).json({msg: "user email already exist"});
    } else {
      var user = new User({fullName, email, password});
      user = await user.save();
      return res.json({user});
    }
  } catch (e) {
    return res.status(500).json({error: e.message});
  }
});

module.exports = authRouter;