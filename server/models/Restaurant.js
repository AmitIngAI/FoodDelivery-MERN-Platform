const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  logo: {
    type: String,
    default: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200',
  },
  coverImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=1200',
  },
  cuisines: [{
    type: String,
  }],
  address: {
    street: String,
    city: String,
    pincode: String,
  },
  phone: String,
  email: String,
  priceForTwo: {
    type: Number,
    default: 400,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  deliveryTime: {
    type: String,
    default: '30-40 min',
  },
  isVeg: {
    type: Boolean,
    default: false,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  openTime: String,
  closeTime: String,
  deliveryFee: {
    type: Number,
    default: 40,
  },
  minOrderAmount: {
    type: Number,
    default: 150,
  },
  freeDeliveryAbove: {
    type: Number,
    default: 500,
  },
  tags: [String],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);