import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Avatar,
  IconButton,
  Badge,
  Switch,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Dashboard,
  Receipt,
  Restaurant,
  BarChart,
  Settings,
  ExitToApp,
  Menu as MenuIcon,
  Close,
  Notifications,
  Store,
  TrendingUp,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../../../redux/slices/authSlice';
import './RestaurantSidebar.css';

const RestaurantSidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { user } = useSelector(state => state.auth);
  const { activeOrders } = useSelector(state => state.restaurant);
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const menuItems = [
    { 
      title: 'Dashboard', 
      icon: <Dashboard />, 
      path: '/restaurant/dashboard',
      badge: null,
    },
    { 
      title: 'Orders', 
      icon: <Receipt />, 
      path: '/restaurant/orders',
      badge: activeOrders?.length || 3,
    },
    { 
      title: 'Menu', 
      icon: <Restaurant />, 
      path: '/restaurant/menu',
      badge: null,
    },
    { 
      title: 'Analytics', 
      icon: <BarChart />, 
      path: '/restaurant/analytics',
      badge: null,
    },
    { 
      title: 'Settings', 
      icon: <Settings />, 
      path: '/restaurant/settings',
      badge: null,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) setMobileOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const sidebarContent = (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="logo-section">
          <Store className="logo-icon" />
          <span>Restaurant Panel</span>
        </div>
        {isMobile && (
          <IconButton onClick={() => setMobileOpen(false)} className="close-btn">
            <Close />
          </IconButton>
        )}
      </div>

      {/* Restaurant Info */}
      <div className="restaurant-info">
        <Avatar
          src={user?.image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200'}
          className="restaurant-avatar"
        />
        <div className="restaurant-details">
          <h3>{user?.name || 'Pizza Paradise'}</h3>
          <div className="status-row">
            <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
            <span className="status-text">{isOnline ? 'Online' : 'Offline'}</span>
            <Switch
              checked={isOnline}
              onChange={(e) => setIsOnline(e.target.checked)}
              size="small"
              color="success"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-item">
          <TrendingUp />
          <div>
            <span className="stat-value">₹12,450</span>
            <span className="stat-label">Today's Revenue</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <motion.div
            key={item.title}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path)}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="nav-icon">
              {item.badge ? (
                <Badge badgeContent={item.badge} color="error">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </span>
            <span className="nav-title">{item.title}</span>
            {location.pathname === item.path && (
              <motion.div
                className="active-indicator"
                layoutId="activeIndicator"
              />
            )}
          </motion.div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <motion.button
          className="logout-btn"
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ExitToApp />
          <span>Logout</span>
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      {isMobile && (
        <motion.button
          className="mobile-toggle"
          onClick={() => setMobileOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MenuIcon />
        </motion.button>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="sidebar-container">
          {sidebarContent}
        </div>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          className="sidebar-drawer"
        >
          {sidebarContent}
        </Drawer>
      )}
    </>
  );
};

export default RestaurantSidebar;