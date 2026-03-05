const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  deliveryPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [{
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
    },
    name: String,
    quantity: Number,
    price: Number,
    customizations: [String],
  }],
  subtotal: {
    type: Number,
    required: true,
  },
  deliveryFee: {
    type: Number,
    default: 0,
  },
  taxes: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'on_the_way', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'wallet'],
    default: 'cash',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  deliveryAddress: {
    name: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
  },
  specialInstructions: String,
  estimatedTime: String,
  rating: Number,
  review: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);