const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.avatar = req.body.avatar || user.avatar;
      user.addresses = req.body.addresses || user.addresses;
      
      if (req.body.password) {
        user.password = req.body.password;
      }
      
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/users/favorites/:restaurantId
// @desc    Add/Remove favorite restaurant
// @access  Private
router.post('/favorites/:restaurantId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const restaurantId = req.params.restaurantId;
    
    const index = user.favorites.indexOf(restaurantId);
    if (index > -1) {
      user.favorites.splice(index, 1);
    } else {
      user.favorites.push(restaurantId);
    }
    
    await user.save();
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;