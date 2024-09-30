const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

// app routes

mongoose.connect(config.db).then(() => {
  console.log('mongodb connected');
});

app.listen(config.port, "0.0.0.0", () => {
  console.log(`Server is running on port ${config.port}`)
});