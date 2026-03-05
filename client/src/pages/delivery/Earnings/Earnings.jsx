import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  AccountBalanceWallet,
  TrendingUp,
  TrendingDown,
  CalendarMonth,
  Download,
  ArrowUpward,
  ArrowDownward,
  LocalShipping,
  AccessTime,
  AttachMoney,
  Receipt,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import './Earnings.css';

const DeliveryEarnings = () => {
  const { earnings, earningsHistory, stats } = useSelector(state => state.delivery);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [currentWeek, setCurrentWeek] = useState(0);

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'all', label: 'All Time' },
  ];

  const getEarningsByPeriod = () => {
    switch (selectedPeriod) {
      case 'today': return earnings.today;
      case 'week': return earnings.thisWeek;
      case 'month': return earnings.thisMonth;
      case 'all': return earnings.total;
      default: return earnings.thisWeek;
    }
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxEarning = Math.max(...earningsHistory.map(e => e.amount));

  return (
    <div className="earnings-page">
      {/* Header */}
      <header className="page-header">
        <div>
          <h1>Earnings</h1>
          <p>Track your income and payouts</p>
        </div>
        <button className="download-btn">
          <Download />
          Download Report
        </button>
      </header>

      {/* Period Selector */}
      <div className="period-selector">
        {periods.map(period => (
          <button
            key={period.id}
            className={`period-btn ${selectedPeriod === period.id ? 'active' : ''}`}
            onClick={() => setSelectedPeriod(period.id)}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Main Earnings Card */}
      <motion.div 
        className="main-earnings-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="earnings-bg-pattern" />
        <div className="earnings-content">
          <div className="earnings-icon">
            <AccountBalanceWallet />
          </div>
          <div className="earnings-info">
            <span className="earnings-label">Total Earnings</span>
            <h2 className="earnings-amount">₹{getEarningsByPeriod().toLocaleString()}</h2>
            <div className="earnings-change positive">
              <TrendingUp />
              <span>+12% from last {selectedPeriod}</span>
            </div>
          </div>
        </div>
        <div className="earnings-breakdown">
          <div className="breakdown-item">
            <span>Delivery Fee</span>
            <strong>₹{Math.round(getEarningsByPeriod() * 0.7)}</strong>
          </div>
          <div className="breakdown-item">
            <span>Tips</span>
            <strong>₹{Math.round(getEarningsByPeriod() * 0.2)}</strong>
          </div>
          <div className="breakdown-item">
            <span>Bonuses</span>
            <strong>₹{Math.round(getEarningsByPeriod() * 0.1)}</strong>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="earnings-stats-grid">
        <motion.div 
          className="earning-stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon orders">
            <LocalShipping />
          </div>
          <div className="stat-details">
            <span>Total Deliveries</span>
            <h3>{stats.todayOrders * 7}</h3>
          </div>
        </motion.div>

        <motion.div 
          className="earning-stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon time">
            <AccessTime />
          </div>
          <div className="stat-details">
            <span>Avg. Per Delivery</span>
            <h3>₹{Math.round(getEarningsByPeriod() / (stats.todayOrders * 7))}</h3>
          </div>
        </motion.div>

        <motion.div 
          className="earning-stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon pending">
            <AttachMoney />
          </div>
          <div className="stat-details">
            <span>Pending Payout</span>
            <h3>₹{earnings.pending}</h3>
          </div>
        </motion.div>
      </div>

      {/* Weekly Chart */}
      <motion.div 
        className="earnings-chart-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="chart-header">
          <h3>Weekly Earnings</h3>
          <div className="week-navigator">
            <button onClick={() => setCurrentWeek(prev => prev + 1)}>
              <ChevronLeft />
            </button>
            <span>This Week</span>
            <button onClick={() => setCurrentWeek(prev => Math.max(0, prev - 1))} disabled={currentWeek === 0}>
              <ChevronRight />
            </button>
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-bars">
            {earningsHistory.slice(0, 7).map((day, index) => (
              <div key={index} className="chart-bar-group">
                <div className="chart-bar-wrapper">
                  <motion.div 
                    className="chart-bar"
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.amount / maxEarning) * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    <span className="bar-value">₹{day.amount}</span>
                  </motion.div>
                </div>
                <span className="bar-label">{weekDays[index]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-summary">
          <div className="summary-item">
            <span>Best Day</span>
            <strong>Thursday • ₹1,100</strong>
          </div>
          <div className="summary-item">
            <span>Weekly Average</span>
            <strong>₹{Math.round(earnings.thisWeek / 7)}/day</strong>
          </div>
        </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div 
        className="transactions-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="card-header">
          <h3>Recent Transactions</h3>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="transactions-list">
          {earningsHistory.map((item, index) => (
            <motion.div 
              key={index}
              className="transaction-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
            >
              <div className="transaction-icon">
                <Receipt />
              </div>
              <div className="transaction-details">
                <h4>{item.orders} Deliveries</h4>
                <p>{new Date(item.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</p>
              </div>
              <div className="transaction-amounts">
                <span className="main-amount">+₹{item.amount}</span>
                {item.tips > 0 && <span className="tip-amount">+₹{item.tips} tips</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Payout Section */}
      <motion.div 
        className="payout-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="payout-info">
          <h3>Next Payout</h3>
          <p>Your earnings will be transferred to your bank account</p>
          <div className="payout-amount">
            <span>Amount</span>
            <strong>₹{earnings.pending}</strong>
          </div>
          <div className="payout-date">
            <CalendarMonth />
            <span>Expected by Jan 20, 2024</span>
          </div>
        </div>
        <button className="withdraw-btn">
          <AccountBalanceWallet />
          Request Withdrawal
        </button>
      </motion.div>
    </div>
  );
};

export default DeliveryEarnings;