const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortdesc: { type: String, required: true },
  img: { type: String, required: true }, // URL from Cloudinary
});

module.exports = mongoose.model('Category', categorySchema);
