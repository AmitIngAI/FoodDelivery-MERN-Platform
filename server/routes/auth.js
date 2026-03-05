const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // ✅ Check all required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'All fields are required',
        errorType: 'validation'
      });
    }

    // ✅ Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        message: 'Email already registered',
        errorType: 'email_exists'
      });
    }

    // Create user
    const user = await User.create({ 
      name, 
      email, 
      password, 
      phone,
      role: role || 'customer' 
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // ✅ Check required fields
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required',
        errorType: 'validation'
      });
    }

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Email not registered',
        errorType: 'email_not_found'
      });
    }

    // ✅ Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        message: 'Incorrect password',
        errorType: 'wrong_password'
      });
    }

    // ✅ Check role if provided
    if (role && user.role !== role) {
      return res.status(401).json({ 
        message: `This email is registered as ${user.role}, not ${role}`,
        errorType: 'wrong_role'
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/check-email
// @desc    Check if email exists
// @access  Public
router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    res.json({
      exists: !!user,
      role: user ? user.role : null
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;