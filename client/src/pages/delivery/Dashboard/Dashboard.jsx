import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  LocalShipping,
  AccessTime,
  AttachMoney,
  Speed,
  CheckCircle,
  NavigateNext,
  Notifications,
  Star,
  DirectionsBike,
} from '@mui/icons-material';
import { toggleOnlineStatus } from '../../../redux/slices/deliverySlice';
import './Dashboard.css';

const DeliveryDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { driver, isOnline, stats, earnings, currentDelivery } = useSelector(state => state.delivery);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const statsCards = [
    {
      icon: <LocalShipping />,
      label: "Today's Deliveries",
      value: stats.todayOrders,
      change: '+2 from yesterday',
      color: 'primary',
    },
    {
      icon: <AttachMoney />,
      label: "Today's Earnings",
      value: `₹${earnings.today}`,
      change: '+₹150 from yesterday',
      color: 'success',
    },
    {
      icon: <Speed />,
      label: 'Avg. Delivery Time',
      value: `${stats.avgDeliveryTime} min`,
      change: '2 min faster',
      color: 'info',
    },
    {
      icon: <TrendingUp />,
      label: 'Acceptance Rate',
      value: `${stats.acceptanceRate}%`,
      change: 'Great job!',
      color: 'secondary',
    },
  ];

  const recentActivities = [
    { id: 1, type: 'delivery', message: 'Delivered to MG Road', time: '10 min ago', icon: <CheckCircle />, color: 'success' },
    { id: 2, type: 'order', message: 'New order accepted', time: '25 min ago', icon: <LocalShipping />, color: 'primary' },
    { id: 3, type: 'rating', message: 'Received 5-star rating', time: '1 hour ago', icon: <Star />, color: 'warning' },
    { id: 4, type: 'delivery', message: 'Delivered to Koramangala', time: '2 hours ago', icon: <CheckCircle />, color: 'success' },
  ];

  return (
    <div className="delivery-dashboard">
      {/* Header */}
      <motion.header 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <div className="greeting">
            <h1>{greeting}, {driver.name?.split(' ')[0]}! 👋</h1>
            <p>{isOnline ? "You're online and ready for deliveries" : "Go online to start earning"}</p>
          </div>
          <div className="header-actions">
            <button className="notification-btn">
              <Notifications />
              <span className="notification-badge">3</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Online Status Card */}
      <motion.div 
        className={`online-status-card ${isOnline ? 'online' : 'offline'}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="status-content">
          <div className="status-icon">
            <DirectionsBike />
          </div>
          <div className="status-text">
            <h3>{isOnline ? 'You are Online' : 'You are Offline'}</h3>
            <p>{isOnline ? 'Waiting for new orders...' : 'Toggle to start receiving orders'}</p>
          </div>
        </div>
        <motion.button
          className={`toggle-btn ${isOnline ? 'online' : 'offline'}`}
          onClick={() => dispatch(toggleOnlineStatus())}
          whileTap={{ scale: 0.95 }}
        >
          {isOnline ? 'Go Offline' : 'Go Online'}
        </motion.button>
      </motion.div>

      {/* Current Delivery Alert */}
      {currentDelivery && (
        <motion.div 
          className="current-delivery-alert"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate('/delivery/active')}
        >
          <div className="alert-content">
            <div className="alert-icon">
              <LocalShipping />
            </div>
            <div className="alert-text">
              <h4>Active Delivery</h4>
              <p>Order #{currentDelivery.id} - {currentDelivery.status}</p>
            </div>
          </div>
          <NavigateNext />
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="stats-grid">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`stat-card ${stat.color}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <h3 className="stat-value">{stat.value}</h3>
              <span className="stat-change">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Earnings Summary */}
        <motion.div 
          className="earnings-summary card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card-header">
            <h3>Earnings Summary</h3>
            <button onClick={() => navigate('/delivery/earnings')}>
              View All <NavigateNext />
            </button>
          </div>
          <div className="earnings-chart">
            <div className="earnings-bars">
              {earnings.thisWeek > 0 && ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <div key={day} className="bar-group">
                  <div 
                    className="bar" 
                    style={{ height: `${Math.random() * 60 + 40}%` }}
                  />
                  <span className="bar-label">{day}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="earnings-totals">
            <div className="earning-item">
              <span>This Week</span>
              <strong>₹{earnings.thisWeek}</strong>
            </div>
            <div className="earning-item">
              <span>This Month</span>
              <strong>₹{earnings.thisMonth}</strong>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          className="recent-activity card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card-header">
            <h3>Recent Activity</h3>
          </div>
          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="activity-item"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className={`activity-icon ${activity.color}`}>
                  {activity.icon}
                </div>
                <div className="activity-content">
                  <p>{activity.message}</p>
                  <span>{activity.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <motion.div 
        className="performance-metrics card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="card-header">
          <h3>Performance Metrics</h3>
        </div>
        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-circle" style={{ '--progress': `${stats.acceptanceRate}%` }}>
              <span>{stats.acceptanceRate}%</span>
            </div>
            <p>Acceptance Rate</p>
          </div>
          <div className="metric-item">
            <div className="metric-circle" style={{ '--progress': `${stats.completionRate}%` }}>
              <span>{stats.completionRate}%</span>
            </div>
            <p>Completion Rate</p>
          </div>
          <div className="metric-item">
            <div className="metric-circle" style={{ '--progress': `${(driver.rating / 5) * 100}%` }}>
              <span>{driver.rating}</span>
            </div>
            <p>Rating</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeliveryDashboard;