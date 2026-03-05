const express = require('express');
const MenuItem = require('../models/MenuItem');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/menu/restaurant/:restaurantId
// @desc    Get all menu items for a restaurant
// @access  Public
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ restaurant: req.params.restaurantId });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/menu
// @desc    Create menu item
// @access  Private (Restaurant)
router.post('/', protect, authorize('restaurant', 'admin'), async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body);
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/menu/:id
// @desc    Update menu item
// @access  Private (Restaurant)
router.put('/:id', protect, authorize('restaurant', 'admin'), async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/menu/:id
// @desc    Delete menu item
// @access  Private (Restaurant)
router.delete('/:id', protect, authorize('restaurant', 'admin'), async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;