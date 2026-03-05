import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  AttachMoney,
  People,
  Star,
  CalendarMonth,
  Download,
  FilterList,
  Restaurant,
  AccessTime,
  LocalOffer,
} from '@mui/icons-material';
import './Analytics.css';

const RestaurantAnalytics = () => {
  const [dateRange, setDateRange] = useState('week');

  const statsCards = [
    {
      icon: <ShoppingCart />,
      label: 'Total Orders',
      value: '1,248',
      change: '+12.5%',
      trend: 'up',
      color: 'primary',
    },
    {
      icon: <AttachMoney />,
      label: 'Revenue',
      value: '₹2,48,500',
      change: '+8.2%',
      trend: 'up',
      color: 'success',
    },
    {
      icon: <People />,
      label: 'New Customers',
      value: '384',
      change: '+23.1%',
      trend: 'up',
      color: 'info',
    },
    {
      icon: <Star />,
      label: 'Avg Rating',
      value: '4.7',
      change: '+0.2',
      trend: 'up',
      color: 'warning',
    },
  ];

  const topItems = [
    { name: 'Margherita Pizza', orders: 245, revenue: 73255, trend: 'up' },
    { name: 'Pepperoni Pizza', orders: 198, revenue: 79002, trend: 'up' },
    { name: 'Pasta Alfredo', orders: 156, revenue: 38844, trend: 'down' },
    { name: 'Garlic Bread', orders: 142, revenue: 21158, trend: 'up' },
    { name: 'Chocolate Brownie', orders: 128, revenue: 19072, trend: 'up' },
  ];

  const hourlyData = [
    { hour: '9AM', orders: 12 },
    { hour: '10AM', orders: 25 },
    { hour: '11AM', orders: 38 },
    { hour: '12PM', orders: 65 },
    { hour: '1PM', orders: 82 },
    { hour: '2PM', orders: 58 },
    { hour: '3PM', orders: 35 },
    { hour: '4PM', orders: 28 },
    { hour: '5PM', orders: 42 },
    { hour: '6PM', orders: 68 },
    { hour: '7PM', orders: 95 },
    { hour: '8PM', orders: 88 },
    { hour: '9PM', orders: 72 },
    { hour: '10PM', orders: 45 },
  ];

  const maxOrders = Math.max(...hourlyData.map(d => d.orders));

  return (
    <div className="analytics-page">
      {/* Header */}
      <header className="analytics-header">
        <div>
          <h1>Analytics</h1>
          <p>Track your restaurant's performance</p>
        </div>
        <div className="header-actions">
          <div className="date-selector">
            <CalendarMonth />
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button className="download-btn">
            <Download />
            Export
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="analytics-stats-grid">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`analytics-stat-card ${stat.color}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <span className="stat-label">{stat.label}</span>
              <h3 className="stat-value">{stat.value}</h3>
              <div className={`stat-change ${stat.trend}`}>
                {stat.trend === 'up' ? <TrendingUp /> : <TrendingDown />}
                <span>{stat.change}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Orders Chart */}
        <motion.div 
          className="chart-card orders-chart"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="chart-header">
            <h3>Orders Overview</h3>
            <div className="chart-legend">
              <span className="legend-item orders">Orders</span>
              <span className="legend-item revenue">Revenue</span>
            </div>
          </div>
          <div className="line-chart">
            <svg viewBox="0 0 800 300" className="chart-svg">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map(i => (
                <line 
                  key={i}
                  x1="50" 
                  y1={50 + i * 50} 
                  x2="750" 
                  y2={50 + i * 50}
                  stroke="#e9ecef"
                  strokeDasharray="5,5"
                />
              ))}
              
              {/* Orders line */}
              <motion.path
                d="M 50,200 L 150,180 L 250,150 L 350,120 L 450,100 L 550,80 L 650,60 L 750,50"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              
              {/* Revenue line */}
              <motion.path
                d="M 50,220 L 150,200 L 250,180 L 350,140 L 450,130 L 550,100 L 650,90 L 750,70"
                fill="none"
                stroke="var(--success)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
              />

              {/* Data points */}
              {[50, 150, 250, 350, 450, 550, 650, 750].map((x, i) => (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={200 - i * 20}
                  r="6"
                  fill="var(--primary)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                />
              ))}
            </svg>
            <div className="chart-x-labels">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Hourly Distribution */}
        <motion.div 
          className="chart-card hourly-chart"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="chart-header">
            <h3>Orders by Hour</h3>
            <span className="peak-time">
              <AccessTime />
              Peak: 7PM - 8PM
            </span>
          </div>
          <div className="bar-chart">
            {hourlyData.map((item, index) => (
              <div key={item.hour} className="bar-item">
                <div className="bar-wrapper">
                  <motion.div
                    className="bar"
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.orders / maxOrders) * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                  />
                </div>
                <span className="bar-label">{item.hour}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="analytics-bottom">
        {/* Top Items */}
        <motion.div 
          className="top-items-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="card-header">
            <h3>Top Selling Items</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="items-list">
            {topItems.map((item, index) => (
              <div key={index} className="item-row">
                <span className="item-rank">#{index + 1}</span>
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>{item.orders} orders</p>
                </div>
                <div className="item-revenue">
                  <strong>₹{item.revenue.toLocaleString()}</strong>
                  <span className={`trend ${item.trend}`}>
                    {item.trend === 'up' ? <TrendingUp /> : <TrendingDown />}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Customer Stats */}
        <motion.div 
          className="customer-stats-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="card-header">
            <h3>Customer Insights</h3>
          </div>
          <div className="customer-metrics">
            <div className="metric-item">
              <div className="metric-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e9ecef" strokeWidth="8" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 * 0.35 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <span>65%</span>
              </div>
              <p>Returning Customers</p>
            </div>
            <div className="metric-item">
              <div className="metric-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e9ecef" strokeWidth="8" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--success)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 * 0.08 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <span>92%</span>
              </div>
              <p>Satisfaction Rate</p>
            </div>
            <div className="metric-item">
              <div className="metric-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e9ecef" strokeWidth="8" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--secondary)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 * 0.22 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <span>78%</span>
              </div>
              <p>Reorder Rate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RestaurantAnalytics;