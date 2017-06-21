/**
 * Sport model.
 */
const mongoose = require('mongoose');

const orderModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: String,
  agree: Boolean,
  shipped: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('orders', orderModel);