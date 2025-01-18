const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  shortdesc: String,
  longdescription: String,
  price: Number,
  rating: Number,
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  img: String,
});

module.exports = mongoose.model('Product', productSchema);
