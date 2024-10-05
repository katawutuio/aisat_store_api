const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  }
});

const Banner = mongoose.Model("Banner", bannerSchema);

module.exports = Banner;