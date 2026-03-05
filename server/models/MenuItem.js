const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: Number,
  category: {
    type: String,
    required: true,
  },
  isVeg: {
    type: Boolean,
    default: true,
  },
  isBestseller: {
    type: Boolean,
    default: false,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  spiceLevel: {
    type: Number,
    default: 0,
  },
  preparationTime: String,
  customizations: [{
    title: String,
    required: Boolean,
    options: [{
      name: String,
      price: Number,
    }],
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('MenuItem', menuItemSchema);