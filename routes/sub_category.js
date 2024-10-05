const express = require("express");
const SubCategory = require("../models/sub_category");
const subCategoryRouter = express.Router();

subCategoryRouter.post('/api/subcategories', async (req, res) => {
  try {
    const {categoryId, categoryName, image, subCategoryName} = req.body;
    const subcategory = new SubCategory({categoryId, categoryName, image, subCategoryName});
    await subcategory.save();
    return res.status(201).send(subcategory);
  } catch (e) {
    return res.status(500).json({error: e.message}) ;
  }
});

module.exports = subCategoryRouter;