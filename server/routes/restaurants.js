const express = require('express');
const Restaurant = require('../models/Restaurant');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/restaurants
// @desc    Get all restaurants
// @access  Public
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('owner', 'name email');
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/restaurants/:id
// @desc    Get restaurant by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('owner', 'name email');
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/restaurants
// @desc    Create restaurant
// @access  Private (Restaurant Owner)
router.post('/', protect, authorize('restaurant', 'admin'), async (req, res) => {
  try {
    const restaurant = await Restaurant.create({
      ...req.body,
      owner: req.user._id,
    });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/restaurants/:id
// @desc    Update restaurant
// @access  Private (Restaurant Owner)
router.put('/:id', protect, authorize('restaurant', 'admin'), async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (restaurant) {
      if (restaurant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
      }

      Object.assign(restaurant, req.body);
      const updatedRestaurant = await restaurant.save();
      res.json(updatedRestaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;