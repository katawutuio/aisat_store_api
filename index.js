const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const authRouter = require('./routes/auth');
const bannerRouter = require('./routes/banner');
const categoryRouter = require('./routes/category');
const subCategoryRouter = require('./routes/sub_category');
const productRouter = require('./routes/product');
const productReviewRouter = require('./routes/product_review');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // enable cors for all routes and origin
// app routes
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subCategoryRouter);
app.use(productRouter);
app.use(productReviewRouter);

mongoose.connect(config.db).then(() => {
  console.log('mongodb connected');
});

app.listen(config.port, "0.0.0.0", () => {
  console.log(`Server is running on port ${config.port}`)
});