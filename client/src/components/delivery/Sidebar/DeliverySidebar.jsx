import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dashboard,
  ListAlt,
  LocalShipping,
  AccountBalanceWallet,
  Person,
  ExitToApp,
  Menu,
  Close,
  Circle,
  PowerSettingsNew,
} from '@mui/icons-material';
import { Avatar, Switch, IconButton } from '@mui/material';
import { toggleOnlineStatus } from '../../../redux/slices/deliverySlice';
import { logout } from '../../../redux/slices/authSlice';
import './DeliverySidebar.css';

const DeliverySidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { driver, isOnline, stats } = useSelector(state => state.delivery);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { path: '/delivery/dashboard', icon: <Dashboard />, label: 'Dashboard' },
    { path: '/delivery/orders', icon: <ListAlt />, label: 'Orders' },
    { path: '/delivery/active', icon: <LocalShipping />, label: 'Active Delivery' },
    { path: '/delivery/earnings', icon: <AccountBalanceWallet />, label: 'Earnings' },
    { path: '/delivery/profile', icon: <Person />, label: 'Profile' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleToggleOnline = () => {
    dispatch(toggleOnlineStatus());
  };

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="sidebar-header">
        <div className="brand">
          <img src="/logo.png" alt="Logo" />
          <div className="brand-text">
            <span className="brand-name">FoodDel</span>
            <span className="brand-role">Delivery Partner</span>
          </div>
        </div>
        <IconButton className="close-btn" onClick={() => setMobileOpen(false)}>
          <Close />
        </IconButton>
      </div>

      {/* Driver Profile */}
      <div className="driver-profile">
        <div className="profile-avatar">
          <Avatar src={driver.avatar} className="avatar">
            {driver.name?.charAt(0)}
          </Avatar>
          <span className={`status-dot ${isOnline ? 'online' : 'offline'}`} />
        </div>
        <div className="profile-info">
          <h4>{driver.name}</h4>
          <div className="rating">
            ⭐ {driver.rating} • {driver.totalDeliveries} deliveries
          </div>
        </div>
      </div>

      {/* Online Toggle */}
      <div className={`online-toggle ${isOnline ? 'online' : 'offline'}`}>
        <div className="toggle-content">
          <div className="toggle-icon">
            <PowerSettingsNew />
          </div>
          <div className="toggle-text">
            <span className="toggle-label">{isOnline ? 'You are Online' : 'You are Offline'}</span>
            <span className="toggle-sub">{isOnline ? 'Accepting orders' : 'Go online to receive orders'}</span>
          </div>
        </div>
        <Switch
          checked={isOnline}
          onChange={handleToggleOnline}
          className="status-switch"
        />
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <span className="stat-value">{stats.todayOrders}</span>
          <span className="stat-label">Today</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.todayDistance} km</span>
          <span className="stat-label">Distance</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.acceptanceRate}%</span>
          <span className="stat-label">Acceptance</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <ExitToApp />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <header className="mobile-header">
        <IconButton onClick={() => setMobileOpen(true)}>
          <Menu />
        </IconButton>
        <div className="mobile-brand">
          <img src="/logo.png" alt="Logo" />
          <span>Delivery Partner</span>
        </div>
        <div className={`mobile-status ${isOnline ? 'online' : 'offline'}`}>
          <Circle />
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="delivery-sidebar desktop">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="delivery-sidebar mobile"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-bottom-nav">
        {menuItems.slice(0, 4).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default DeliverySidebar;