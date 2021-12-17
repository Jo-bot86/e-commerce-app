const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  main_category: {
    type: String,
    required: true
  },
  sub_category: {
    type: String,
    required: true
  },
  info: {
    type: String
  },
  thumbnails: {
    url: [{
      type: String,
    }],
    description: {
      type: String
    }
  },
  inStock: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  },
  userId: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;