import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Person,
  Email,
  Phone,
  DirectionsBike,
  Badge,
  Star,
  LocalShipping,
  Edit,
  CameraAlt,
  Save,
  Close,
  LocationOn,
  AccountBalance,
  Description,
  Verified,
  EmojiEvents,
  TrendingUp,
} from '@mui/icons-material';
import { Avatar, TextField, Switch } from '@mui/material';
import { updateDriverProfile } from '../../../redux/slices/deliverySlice';
import './Profile.css';

const DeliveryProfile = () => {
  const dispatch = useDispatch();
  const { driver, stats, isOnline } = useSelector(state => state.delivery);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: driver.name,
    email: driver.email,
    phone: driver.phone,
    vehicle: driver.vehicle,
    vehicleNumber: driver.vehicleNumber,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateDriverProfile(formData));
    setIsEditing(false);
  };

  const achievements = [
    { icon: '🏆', title: 'Top Performer', desc: 'Completed 1000+ deliveries', earned: true },
    { icon: '⭐', title: '5-Star Champion', desc: 'Maintained 4.8+ rating', earned: true },
    { icon: '🚀', title: 'Speed Demon', desc: 'Avg delivery under 25 min', earned: true },
    { icon: '💯', title: 'Perfect Week', desc: '100% completion rate', earned: false },
  ];

  return (
    <div className="delivery-profile-page">
      {/* Header */}
      <header className="page-header">
        <div>
          <h1>My Profile</h1>
          <p>Manage your account and preferences</p>
        </div>
      </header>

      <div className="profile-content">
        {/* Profile Card */}
        <motion.div 
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Cover */}
          <div className="profile-cover">
            <div className="cover-pattern" />
          </div>

          {/* Avatar Section */}
          <div className="profile-avatar-section">
            <div className="avatar-wrapper">
              <Avatar src={driver.avatar} className="profile-avatar">
                {driver.name?.charAt(0)}
              </Avatar>
              <button className="change-avatar-btn">
                <CameraAlt />
              </button>
              <span className={`online-status ${isOnline ? 'online' : 'offline'}`} />
            </div>
            <div className="profile-basic-info">
              <h2>{driver.name}</h2>
              <div className="profile-badges">
                <span className="badge verified">
                  <Verified /> Verified
                </span>
                <span className="badge rating">
                  <Star /> {driver.rating}
                </span>
              </div>
              <p className="member-since">Member since {new Date(driver.joinedDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
            </div>
            {!isEditing ? (
              <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                <Edit /> Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                  <Close /> Cancel
                </button>
                <button className="save-btn" onClick={handleSave}>
                  <Save /> Save
                </button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="profile-stats">
            <div className="stat-item">
              <LocalShipping />
              <div>
                <strong>{driver.totalDeliveries}</strong>
                <span>Deliveries</span>
              </div>
            </div>
            <div className="stat-item">
              <Star />
              <div>
                <strong>{driver.rating}</strong>
                <span>Rating</span>
              </div>
            </div>
            <div className="stat-item">
              <TrendingUp />
              <div>
                <strong>{stats.acceptanceRate}%</strong>
                <span>Acceptance</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Details Section */}
        <div className="profile-details-section">
          {/* Personal Info */}
          <motion.div 
            className="details-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3>Personal Information</h3>
            <div className="details-form">
              <div className="form-group">
                <label><Person /> Full Name</label>
                {isEditing ? (
                  <TextField
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                  />
                ) : (
                  <p>{driver.name}</p>
                )}
              </div>
              <div className="form-group">
                <label><Email /> Email</label>
                {isEditing ? (
                  <TextField
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                  />
                ) : (
                  <p>{driver.email}</p>
                )}
              </div>
              <div className="form-group">
                <label><Phone /> Phone Number</label>
                {isEditing ? (
                  <TextField
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                  />
                ) : (
                  <p>{driver.phone}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Vehicle Info */}
          <motion.div 
            className="details-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Vehicle Information</h3>
            <div className="details-form">
              <div className="form-group">
                <label><DirectionsBike /> Vehicle Type</label>
                {isEditing ? (
                  <TextField
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                  />
                ) : (
                  <p>{driver.vehicle}</p>
                )}
              </div>
              <div className="form-group">
                <label><Badge /> Vehicle Number</label>
                {isEditing ? (
                  <TextField
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                  />
                ) : (
                  <p>{driver.vehicleNumber}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Documents */}
          <motion.div 
            className="details-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Documents</h3>
            <div className="documents-list">
              <div className="document-item verified">
                <Description />
                <div className="doc-info">
                  <h4>Driving License</h4>
                  <p>Verified • Expires Dec 2025</p>
                </div>
                <Verified className="verified-icon" />
              </div>
              <div className="document-item verified">
                <Description />
                <div className="doc-info">
                  <h4>Vehicle RC</h4>
                  <p>Verified • Valid</p>
                </div>
                <Verified className="verified-icon" />
              </div>
              <div className="document-item verified">
                <Description />
                <div className="doc-info">
                  <h4>Insurance</h4>
                  <p>Verified • Expires Jun 2024</p>
                </div>
                <Verified className="verified-icon" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div 
          className="achievements-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3><EmojiEvents /> Achievements</h3>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className={`achievement-item ${achievement.earned ? 'earned' : 'locked'}`}
                whileHover={{ scale: achievement.earned ? 1.05 : 1 }}
              >
                <span className="achievement-icon">{achievement.icon}</span>
                <h4>{achievement.title}</h4>
                <p>{achievement.desc}</p>
                {!achievement.earned && <div className="locked-overlay">🔒</div>}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div 
          className="settings-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Preferences</h3>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Push Notifications</h4>
                <p>Receive order alerts and updates</p>
              </div>
              <Switch defaultChecked color="primary" />
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Sound Alerts</h4>
                <p>Play sound for new orders</p>
              </div>
              <Switch defaultChecked color="primary" />
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Auto-Accept Orders</h4>
                <p>Automatically accept matching orders</p>
              </div>
              <Switch color="primary" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DeliveryProfile;