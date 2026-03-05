const express = require('express');
const Order = require('../models/Order');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order
// @access  Private (Customer)
router.post('/', protect, authorize('customer'), async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      customer: req.user._id,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/orders
// @desc    Get user orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let orders;
    if (req.user.role === 'customer') {
      orders = await Order.find({ customer: req.user._id })
        .populate('restaurant', 'name logo')
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'restaurant') {
      const Restaurant = require('../models/Restaurant');
      const restaurant = await Restaurant.findOne({ owner: req.user._id });
      orders = await Order.find({ restaurant: restaurant._id })
        .populate('customer', 'name phone')
        .sort({ createdAt: -1 });
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/orders/:id
// @desc    Update order status
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;