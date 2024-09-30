const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const authRouter = require('./routes/auth');

const app = express();
app.use(express.json());

// app routes
app.use(authRouter);

mongoose.connect(config.db).then(() => {
  console.log('mongodb connected');
});

app.listen(config.port, "0.0.0.0", () => {
  console.log(`Server is running on port ${config.port}`)
});