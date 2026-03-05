const mongoose = require('mongoose');

const deliveryPersonSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vehicle: {
    type: String,
    number: String,
  },
  license: String,
  isAvailable: {
    type: Boolean,
    default: true,
  },
  currentLocation: {
    lat: Number,
    lng: Number,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  totalDeliveries: {
    type: Number,
    default: 0,
  },
  earnings: {
    today: { type: Number, default: 0 },
    week: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('DeliveryPerson', deliveryPersonSchema);