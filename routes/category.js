const express = require('express');
const Category = require('../models/category');
const categoryRouter = express.Router();

categoryRouter.post('/api/categories', async (req, res) => {
  try {
    const {name, image, banner} = req.body;
    const category = new Category({name, image, banner});
    await category.save();
    return res.status(201).send(category);
  } catch (e) {
    return res.status(500).json({error: e.message}) ;
  }
});

module.exports = categoryRouter;