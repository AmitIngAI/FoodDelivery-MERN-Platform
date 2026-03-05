import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Avatar,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Switch,
  Divider,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Edit,
  CameraAlt,
  Receipt,
  Favorite,
  Payment,
  Notifications,
  Help,
  ExitToApp,
  ChevronRight,
  DarkMode,
  Language,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { logout, updateUser } from '../../../redux/slices/authSlice';
import { toggleTheme } from '../../../redux/slices/uiSlice';
import { toast } from 'react-toastify';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { orders, favorites, addresses } = useSelector(state => state.customer);
  const { theme } = useSelector(state => state.ui);

  const [editMode, setEditMode] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const stats = [
    { label: 'Orders', value: orders.length + 5, icon: Receipt },
    { label: 'Favorites', value: favorites.length + 3, icon: Favorite },
    { label: 'Addresses', value: addresses.length, icon: LocationOn },
  ];

  const menuItems = [
    { icon: Receipt, label: 'My Orders', path: '/orders', badge: orders.length },
    { icon: Favorite, label: 'Favorites', path: '/favorites' },
    { icon: LocationOn, label: 'Saved Addresses', path: '/addresses' },
    { icon: Payment, label: 'Payment Methods', path: '/payments' },
    { icon: Notifications, label: 'Notifications', path: '/notifications' },
    { icon: Help, label: 'Help & Support', path: '/help' },
  ];

  const handleSave = () => {
    dispatch(updateUser(formData));
    setEditMode(false);
    toast.success('Profile updated successfully! ✨');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.success('Logged out successfully!');
  };

  return (
    <div className="profile-page">
      <Container>
        <Grid container spacing={4}>
          {/* Left Column - Profile Info */}
          <Grid item xs={12} lg={4}>
            <motion.div
              className="profile-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Avatar */}
              <div className="avatar-section">
                <div className="avatar-wrapper">
                  <Avatar
                    src={user?.avatar || 'https://i.pravatar.cc/200?img=3'}
                    className="profile-avatar"
                  />
                  <motion.button
                    className="camera-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <CameraAlt />
                  </motion.button>
                </div>
                <h2>{user?.name || 'John Doe'}</h2>
                <p>{user?.email || 'john@example.com'}</p>
              </div>

              <Divider />

              {/* Stats */}
              <div className="profile-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <stat.icon className="stat-icon" />
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <Divider />

              {/* Menu Items */}
              <div className="profile-menu">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="menu-item"
                    onClick={() => navigate(item.path)}
                    whileHover={{ x: 5 }}
                  >
                    <item.icon className="menu-icon" />
                    <span className="menu-label">{item.label}</span>
                    {item.badge > 0 && (
                      <span className="menu-badge">{item.badge}</span>
                    )}
                    <ChevronRight className="menu-arrow" />
                  </motion.div>
                ))}
              </div>

              <Divider />

              {/* Logout Button */}
              <motion.button
                className="logout-btn"
                onClick={() => setShowLogout(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExitToApp />
                Logout
              </motion.button>
            </motion.div>
          </Grid>

          {/* Right Column - Settings */}
          <Grid item xs={12} lg={8}>
            {/* Personal Info */}
            <motion.div
              className="settings-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card-header">
                <div>
                  <h3>Personal Information</h3>
                  <p>Manage your personal details</p>
                </div>
                <motion.button
                  className={`edit-btn ${editMode ? 'active' : ''}`}
                  onClick={() => editMode ? handleSave() : setEditMode(true)}
                  whileHover={{ scale: 1.05 }}
                >
                  {editMode ? 'Save' : <><Edit /> Edit</>}
                </motion.button>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>
                    <Person /> Full Name
                  </label>
                  <TextField
                    fullWidth
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!editMode}
                    variant="outlined"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Email /> Email Address
                  </label>
                  <TextField
                    fullWidth
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!editMode}
                    variant="outlined"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Phone /> Phone Number
                  </label>
                  <TextField
                    fullWidth
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!editMode}
                    variant="outlined"
                  />
                </div>
              </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
              className="settings-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-header">
                <div>
                  <h3>Preferences</h3>
                  <p>Customize your app experience</p>
                </div>
              </div>

              <div className="preferences-list">
                <div className="preference-item">
                  <div className="pref-info">
                    <DarkMode />
                    <div>
                      <h4>Dark Mode</h4>
                      <p>Switch to dark theme</p>
                    </div>
                  </div>
                  <Switch
                    checked={theme === 'dark'}
                    onChange={() => dispatch(toggleTheme())}
                    color="primary"
                  />
                </div>

                <div className="preference-item">
                  <div className="pref-info">
                    <Notifications />
                    <div>
                      <h4>Push Notifications</h4>
                      <p>Receive order updates</p>
                    </div>
                  </div>
                  <Switch defaultChecked color="primary" />
                </div>

                <div className="preference-item">
                  <div className="pref-info">
                    <Email />
                    <div>
                      <h4>Email Notifications</h4>
                      <p>Get offers via email</p>
                    </div>
                  </div>
                  <Switch defaultChecked color="primary" />
                </div>

                <div className="preference-item">
                  <div className="pref-info">
                    <Language />
                    <div>
                      <h4>Language</h4>
                      <p>English (US)</p>
                    </div>
                  </div>
                  <ChevronRight />
                </div>
              </div>
            </motion.div>

            {/* Account Stats */}
            <motion.div
              className="settings-card stats-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="card-header">
                <div>
                  <h3>Account Overview</h3>
                  <p>Your activity summary</p>
                </div>
              </div>

              <div className="overview-grid">
                <div className="overview-item">
                  <span className="overview-value">₹12,450</span>
                  <span className="overview-label">Total Spent</span>
                </div>
                <div className="overview-item">
                  <span className="overview-value">₹2,350</span>
                  <span className="overview-label">Total Savings</span>
                </div>
                <div className="overview-item">
                  <span className="overview-value">1,250</span>
                  <span className="overview-label">Reward Points</span>
                </div>
                <div className="overview-item">
                  <span className="overview-value">Gold</span>
                  <span className="overview-label">Member Status</span>
                </div>
              </div>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Logout Dialog */}
      <Dialog
        open={showLogout}
        onClose={() => setShowLogout(false)}
        className="logout-dialog"
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to logout?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLogout(false)}>Cancel</Button>
          <Button onClick={handleLogout} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;