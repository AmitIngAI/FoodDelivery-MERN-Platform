import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Checkbox,
  FormControlLabel,
  Divider,
  CircularProgress,
  Dialog,
  DialogContent,
} from '@mui/material';
import {
  Person,
  Restaurant,
  TwoWheeler,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Apple,
  ArrowForward,
  CheckCircle,
  ErrorOutline,
  PersonAdd,
  Login as LoginIcon,
  LockOpen,
  MarkEmailRead,
  Warning,
  Phone,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { login, register, clearError } from '../../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isAuthenticated, loading, error, errorType, role: userRole } = useSelector(state => state.auth);
  
  const [role, setRole] = useState('customer');
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  // Popup State
  const [popup, setPopup] = useState({
    open: false,
    type: '',
    title: '',
    message: '',
    subMessage: '',
    buttonText: '',
    buttonIcon: null,
    color: '',
  });

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === 'restaurant') {
        navigate('/restaurant/dashboard');
      } else if (userRole === 'delivery') {
        navigate('/delivery/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  // Handle errors with popup
  useEffect(() => {
    if (error && errorType) {
      handleErrorPopup(errorType, error);
      dispatch(clearError());
    }
  }, [error, errorType, dispatch]);

  // Error popup logic
  const handleErrorPopup = (type, message) => {
    switch (type) {
      case 'email_not_found':
        setPopup({
          open: true,
          type: 'email_not_found',
          title: 'Email Not Found! 📧',
          message: 'This email is not registered with us.',
          subMessage: 'Would you like to create a new account?',
          buttonText: 'Create Account',
          buttonIcon: <PersonAdd />,
          color: '#FF6B6B',
        });
        break;
        
      case 'wrong_password':
        setPopup({
          open: true,
          type: 'wrong_password',
          title: 'Incorrect Password! 🔐',
          message: 'The password you entered is wrong.',
          subMessage: 'Please try again or reset your password.',
          buttonText: 'Try Again',
          buttonIcon: <LockOpen />,
          color: '#FFC43D',
        });
        break;
        
      case 'email_exists':
        setPopup({
          open: true,
          type: 'email_exists',
          title: 'Welcome Back! 👋',
          message: 'This email is already registered.',
          subMessage: 'Please login with your password.',
          buttonText: 'Login Now',
          buttonIcon: <LoginIcon />,
          color: '#4ECDC4',
        });
        break;
        
      case 'wrong_role':
        setPopup({
          open: true,
          type: 'wrong_role',
          title: 'Wrong Account Type! ⚠️',
          message: message,
          subMessage: 'Please select the correct account type.',
          buttonText: 'Got It',
          buttonIcon: <CheckCircle />,
          color: '#FF6B6B',
        });
        break;
        
      case 'validation':
        toast.error(message);
        break;
        
      default:
        toast.error(message || 'Something went wrong');
    }
  };

  // Handle popup action
  const handlePopupAction = () => {
    switch (popup.type) {
      case 'email_not_found':
        setIsSignup(true);
        setFormData({ ...formData, name: '', phone: '', password: '' });
        break;
        
      case 'email_exists':
        setIsSignup(false);
        setFormData({ ...formData, password: '' });
        break;
        
      case 'wrong_password':
        setFormData({ ...formData, password: '' });
        break;
        
      default:
        break;
    }
    setPopup({ ...popup, open: false });
    setErrors({});
  };

  // Particle animation background
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.opacity = Math.random() * 0.5 + 0.3;
      document.querySelector('.login-page')?.appendChild(particle);
      
      setTimeout(() => particle.remove(), 5000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  const roleData = {
    customer: {
      title: 'Order Delicious Food',
      subtitle: 'Your favorite meals delivered to your doorstep',
      icon: <Person />,
      color: '#FF6B6B',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      features: ['🍔 1000+ Restaurants', '⚡ Fast Delivery', '💳 Easy Payment'],
    },
    restaurant: {
      title: 'Grow Your Business',
      subtitle: 'Reach millions of hungry customers',
      icon: <Restaurant />,
      color: '#4ECDC4',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      features: ['📊 Real-time Analytics', '💰 Increase Revenue', '🎯 Smart Marketing'],
    },
    delivery: {
      title: 'Earn on Your Schedule',
      subtitle: 'Deliver food and earn money flexibly',
      icon: <TwoWheeler />,
      color: '#FFE66D',
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800',
      features: ['💵 High Earnings', '⏰ Flexible Hours', '🏆 Weekly Bonuses'],
    },
  };

  const currentRole = roleData[role];

  // Validate form - All fields compulsory
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation (signup only)
    if (isSignup) {
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (isSignup && !/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }
    
    // Phone validation (signup only)
    if (isSignup) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly');
      return;
    }
    
    try {
      if (isSignup) {
        await dispatch(register({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          phone: formData.phone.trim(),
          role: role,
        })).unwrap();
        
        toast.success(`Welcome ${formData.name}! Account created successfully 🎉`);
      } else {
        await dispatch(login({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          role: role,
        })).unwrap();
        
        toast.success(`Welcome back! Login successful 🎉`);
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(`${provider} login coming soon! 🚀`);
  };

  return (
    <div className="login-page">
      {/* Animated Background */}
      <div className="login-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Professional Animated Popup Dialog */}
      <Dialog
        open={popup.open}
        onClose={() => setPopup({ ...popup, open: false })}
        PaperProps={{
          style: {
            borderRadius: '24px',
            padding: '0',
            overflow: 'hidden',
            maxWidth: '420px',
            width: '90%',
          },
        }}
      >
        <DialogContent style={{ padding: 0 }}>
          <AnimatePresence>
            {popup.open && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{
                  background: `linear-gradient(135deg, ${popup.color} 0%, ${popup.color}dd 100%)`,
                  padding: '45px 35px',
                  textAlign: 'center',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background Pattern */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.1,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />

                {/* Animated Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    border: '3px solid rgba(255,255,255,0.3)',
                  }}
                >
                  {popup.type === 'email_not_found' && <MarkEmailRead style={{ fontSize: '45px' }} />}
                  {popup.type === 'wrong_password' && <Lock style={{ fontSize: '45px' }} />}
                  {popup.type === 'email_exists' && <CheckCircle style={{ fontSize: '45px' }} />}
                  {popup.type === 'wrong_role' && <Warning style={{ fontSize: '45px' }} />}
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    margin: '0 0 12px',
                    fontSize: '1.6rem',
                    fontWeight: '700',
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  }}
                >
                  {popup.title}
                </motion.h3>

                {/* Message */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    margin: '0 0 8px',
                    fontSize: '1.05rem',
                    opacity: 0.95,
                    fontWeight: '500',
                  }}
                >
                  {popup.message}
                </motion.p>

                {/* Email Display */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  style={{
                    margin: '16px 0',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '12px 20px',
                    borderRadius: '30px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    backdropFilter: 'blur(5px)',
                  }}
                >
                  <Email style={{ fontSize: '1.2rem' }} />
                  <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>
                    {formData.email}
                  </span>
                </motion.div>

                {/* Sub Message */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    margin: '0 0 28px',
                    fontSize: '0.95rem',
                    opacity: 0.85,
                  }}
                >
                  {popup.subMessage}
                </motion.p>

                {/* Action Button */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePopupAction}
                  style={{
                    background: 'white',
                    color: popup.color,
                    border: 'none',
                    padding: '16px 45px',
                    borderRadius: '35px',
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    fontFamily: 'Poppins, sans-serif',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {popup.buttonIcon}
                  {popup.buttonText}
                </motion.button>

                {/* Cancel Link */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={() => setPopup({ ...popup, open: false })}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.75)',
                    marginTop: '18px',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'block',
                    width: '100%',
                    fontFamily: 'Poppins, sans-serif',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.75)'}
                >
                  Dismiss
                </motion.button>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                  }}
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ 
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '-30px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <Container maxWidth="xl" className="login-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="login-wrapper"
        >
          {/* Left Side - Image & Info */}
          <motion.div 
            className="login-left"
            style={{ background: `linear-gradient(135deg, ${currentRole.color}dd, ${currentRole.color}99)` }}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="login-left-content">
              <motion.div 
                className="logo-section"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
              >
                <div className="logo-circle">
                  <img src="/logo.png" alt="Logo" className="logo-img" />
                </div>
                <h1 className="brand-name">FoodDelivery Pro</h1>
              </motion.div>

              <motion.div
                className="role-info"
                key={role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="role-icon-large">
                  {currentRole.icon}
                </div>
                <h2 className="role-title">{currentRole.title}</h2>
                <p className="role-subtitle">{currentRole.subtitle}</p>

                <div className="features-list">
                  {currentRole.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="feature-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <CheckCircle className="feature-check" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="decorative-image"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <img src={currentRole.image} alt={role} />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div 
            className="login-right"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Paper className="login-form-container" elevation={0}>
              <div className="form-header">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isSignup ? 'signup' : 'login'}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
                    <p>{isSignup ? 'Fill all fields to get started' : 'Login to continue your journey'}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Role Selector */}
              <ToggleButtonGroup
                value={role}
                exclusive
                onChange={(e, value) => value && setRole(value)}
                className="role-selector"
                fullWidth
              >
                <ToggleButton value="customer" className="role-toggle">
                  <Person className="role-icon" />
                  <span>Customer</span>
                </ToggleButton>
                <ToggleButton value="restaurant" className="role-toggle">
                  <Restaurant className="role-icon" />
                  <span>Restaurant</span>
                </ToggleButton>
                <ToggleButton value="delivery" className="role-toggle">
                  <TwoWheeler className="role-icon" />
                  <span>Delivery</span>
                </ToggleButton>
              </ToggleButtonGroup>

              <Divider className="form-divider">
                <span className="divider-text">
                  {isSignup ? 'Enter Your Details' : 'Login Details'}
                </span>
              </Divider>

              {/* Form */}
              <form onSubmit={handleSubmit} className="login-form">
                <AnimatePresence mode="wait">
                  {isSignup && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TextField
                        fullWidth
                        label="Full Name *"
                        variant="outlined"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        error={!!errors.name}
                        helperText={errors.name}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person className="input-icon" />
                            </InputAdornment>
                          ),
                        }}
                        className="form-input"
                        placeholder="Enter your full name"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <TextField
                  fullWidth
                  label="Email Address *"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email className="input-icon" />
                      </InputAdornment>
                    ),
                  }}
                  className="form-input"
                  placeholder="Enter your email"
                />

                <TextField
                  fullWidth
                  label="Password *"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  error={!!errors.password}
                  helperText={errors.password || (isSignup ? 'Min 6 characters with at least 1 number' : '')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock className="input-icon" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  className="form-input"
                  placeholder="Enter your password"
                />

                <AnimatePresence mode="wait">
                  {isSignup && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TextField
                        fullWidth
                        label="Phone Number *"
                        variant="outlined"
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setFormData({ ...formData, phone: value });
                        }}
                        error={!!errors.phone}
                        helperText={errors.phone || 'Enter 10-digit mobile number'}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone className="input-icon" />
                              <span style={{ marginLeft: '5px', color: '#666' }}>+91</span>
                            </InputAdornment>
                          ),
                        }}
                        className="form-input"
                        placeholder="9876543210"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isSignup && (
                  <div className="form-options">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          sx={{
                            color: currentRole.color,
                            '&.Mui-checked': { color: currentRole.color },
                          }}
                        />
                      }
                      label="Remember me"
                    />
                    <a href="#" className="forgot-link">Forgot Password?</a>
                  </div>
                )}

                <motion.button
                  type="submit"
                  className="submit-btn"
                  style={{ background: `linear-gradient(135deg, ${currentRole.color}, ${currentRole.color}dd)` }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    <>
                      <span>{isSignup ? 'Create Account' : 'Login Now'}</span>
                      <ArrowForward />
                    </>
                  )}
                </motion.button>
              </form>

              <Divider className="form-divider">
                <span className="divider-text">Or continue with</span>
              </Divider>

              {/* Social Login */}
              <div className="social-login">
                <motion.button
                  className="social-btn google"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialLogin('Google')}
                  type="button"
                >
                  <Google />
                </motion.button>
                <motion.button
                  className="social-btn facebook"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialLogin('Facebook')}
                  type="button"
                >
                  <Facebook />
                </motion.button>
                <motion.button
                  className="social-btn apple"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialLogin('Apple')}
                  type="button"
                >
                  <Apple />
                </motion.button>
              </div>

              {/* Toggle Signup/Login */}
              <p className="toggle-auth">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  className="toggle-link"
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setErrors({});
                    setFormData({ ...formData, password: '' });
                  }}
                  style={{ color: currentRole.color }}
                >
                  {isSignup ? 'Login' : 'Sign Up'}
                </button>
              </p>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Login;