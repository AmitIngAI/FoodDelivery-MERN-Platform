import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, Card, CardContent, Avatar, Chip } from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  AttachMoney,
  People,
  Timer,
  Notifications,
  ArrowForward,
  Star,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { motion } from 'framer-motion';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { stats, activeOrders, menu } = useSelector(state => state.restaurant);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const statCards = [
    {
      title: "Today's Orders",
      value: stats.today.orders,
      change: '+12%',
      trend: 'up',
      icon: <ShoppingBag />,
      color: '#FF6B6B',
      bgGradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
    },
    {
      title: "Today's Revenue",
      value: `₹${stats.today.revenue.toLocaleString()}`,
      change: '+8%',
      trend: 'up',
      icon: <AttachMoney />,
      color: '#4ECDC4',
      bgGradient: 'linear-gradient(135deg, #4ECDC4 0%, #6FD9D1 100%)',
    },
    {
      title: 'Avg Order Value',
      value: `₹${stats.today.avgOrderValue}`,
      change: '+5%',
      trend: 'up',
      icon: <TrendingUp />,
      color: '#FFE66D',
      bgGradient: 'linear-gradient(135deg, #FFE66D 0%, #FFF0A5 100%)',
    },
    {
      title: 'New Customers',
      value: stats.today.newCustomers,
      change: '-2%',
      trend: 'down',
      icon: <People />,
      color: '#A855F7',
      bgGradient: 'linear-gradient(135deg, #A855F7 0%, #C084FC 100%)',
    },
  ];

  const COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A855F7'];

  const pieData = stats.topItems.map((item, index) => ({
    name: item.name,
    value: item.orders,
    color: COLORS[index % COLORS.length],
  }));

  const recentActivities = [
    { id: 1, type: 'order', message: 'New order #ORD001 received', time: '2 mins ago', icon: '🛒' },
    { id: 2, type: 'complete', message: 'Order #ORD002 completed', time: '15 mins ago', icon: '✅' },
    { id: 3, type: 'review', message: 'New 5-star review received', time: '30 mins ago', icon: '⭐' },
    { id: 4, type: 'alert', message: 'Low stock: Garlic Bread', time: '1 hour ago', icon: '⚠️' },
    { id: 5, type: 'order', message: 'New order #ORD003 received', time: '2 hours ago', icon: '🛒' },
  ];

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>{greeting}, Pizza Paradise! 👋</h1>
            <p>Here's what's happening with your restaurant today.</p>
          </motion.div>

          <div className="header-actions">
            <motion.button
              className="notification-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Notifications />
              <span className="notification-badge">3</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="stat-card" style={{ background: stat.bgGradient }}>
              <CardContent>
                <div className="stat-content">
                  <div className="stat-info">
                    <span className="stat-title">{stat.title}</span>
                    <h2 className="stat-value">{stat.value}</h2>
                    <div className={`stat-change ${stat.trend}`}>
                      {stat.trend === 'up' ? <TrendingUp /> : <TrendingDown />}
                      <span>{stat.change} from yesterday</span>
                    </div>
                  </div>
                  <div className="stat-icon">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Grid container spacing={3}>
        {/* Revenue Chart */}
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="chart-card">
              <CardContent>
                <div className="card-header">
                  <h3>Weekly Revenue</h3>
                  <div className="chart-legend">
                    <span className="legend-item">
                      <span className="dot" style={{ background: '#4ECDC4' }}></span>
                      Revenue
                    </span>
                    <span className="legend-item">
                      <span className="dot" style={{ background: '#FF6B6B' }}></span>
                      Orders
                    </span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={stats.weekly}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#6c757d" />
                    <YAxis stroke="#6c757d" />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'white', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#4ECDC4" 
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#FF6B6B" 
                      strokeWidth={3}
                      dot={{ fill: '#FF6B6B', strokeWidth: 2, r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Top Items Pie Chart */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="chart-card">
              <CardContent>
                <div className="card-header">
                  <h3>Top Selling Items</h3>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pie-legend">
                  {pieData.map((item, index) => (
                    <div key={index} className="pie-legend-item">
                      <span className="pie-dot" style={{ background: item.color }}></span>
                      <span className="pie-name">{item.name}</span>
                      <span className="pie-value">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Active Orders */}
        <Grid item xs={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="orders-card">
              <CardContent>
                <div className="card-header">
                  <h3>Active Orders ({activeOrders.length})</h3>
                  <motion.button
                    className="view-all-btn"
                    onClick={() => navigate('/restaurant/orders')}
                    whileHover={{ scale: 1.05 }}
                  >
                    View All <ArrowForward />
                  </motion.button>
                </div>
                <div className="orders-list">
                  {activeOrders.slice(0, 4).map((order) => (
                    <div key={order.id} className="order-item">
                      <Avatar src={order.customer.avatar} className="customer-avatar" />
                      <div className="order-info">
                        <h4>Order #{order.id}</h4>
                        <p>{order.customer.name}</p>
                      </div>
                      <div className="order-meta">
                        <span className="order-amount">₹{order.totalAmount}</span>
                        <Chip 
                          label={order.status} 
                          size="small"
                          className={`status-chip ${order.status}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="activity-card">
              <CardContent>
                <div className="card-header">
                  <h3>Recent Activity</h3>
                </div>
                <div className="activity-list">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="activity-item">
                      <span className="activity-icon">{activity.icon}</span>
                      <div className="activity-info">
                        <p className="activity-message">{activity.message}</p>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;