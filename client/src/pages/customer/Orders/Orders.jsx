import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Tabs, Tab, Chip, Rating } from '@mui/material';
import {
  Receipt,
  CheckCircle,
  LocalShipping,
  Cancel,
  Replay,
  Star,
  AccessTime,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { orders as mockOrders } from '../../../utils/mockData';
import './Orders.css';

const Orders = () => {
  const navigate = useNavigate();
  const { orders: reduxOrders } = useSelector(state => state.customer);
  const [activeTab, setActiveTab] = useState(0);

  // Combine redux orders with mock orders
  const allOrders = [...reduxOrders, ...mockOrders];

  const getStatusConfig = (status) => {
    const configs = {
      confirmed: { color: 'info', icon: <CheckCircle />, label: 'Confirmed' },
      preparing: { color: 'warning', icon: <AccessTime />, label: 'Preparing' },
      on_the_way: { color: 'primary', icon: <LocalShipping />, label: 'On the Way' },
      delivered: { color: 'success', icon: <CheckCircle />, label: 'Delivered' },
      cancelled: { color: 'error', icon: <Cancel />, label: 'Cancelled' },
    };
    return configs[status] || configs.confirmed;
  };

  const filterOrders = (tabIndex) => {
    switch (tabIndex) {
      case 1: return allOrders.filter(o => ['confirmed', 'preparing', 'on_the_way'].includes(o.status));
      case 2: return allOrders.filter(o => o.status === 'delivered');
      case 3: return allOrders.filter(o => o.status === 'cancelled');
      default: return allOrders;
    }
  };

  const filteredOrders = filterOrders(activeTab);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="orders-page">
      <Container>
        {/* Header */}
        <div className="orders-header">
          <Receipt className="header-icon" />
          <div>
            <h1>My Orders</h1>
            <p>Track and manage your orders</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <Tabs
            value={activeTab}
            onChange={(e, val) => setActiveTab(val)}
            className="orders-tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label={`All (${allOrders.length})`} />
            <Tab label={`Active (${filterOrders(1).length})`} />
            <Tab label={`Completed (${filterOrders(2).length})`} />
            <Tab label={`Cancelled (${filterOrders(3).length})`} />
          </Tabs>
        </div>

        {/* Orders List */}
        <div className="orders-list">
          <AnimatePresence>
            {filteredOrders.length === 0 ? (
              <motion.div
                className="no-orders"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png" alt="No orders" />
                <h3>No orders found</h3>
                <p>Start ordering delicious food now!</p>
                <motion.button
                  className="browse-btn"
                  onClick={() => navigate('/restaurants')}
                  whileHover={{ scale: 1.05 }}
                >
                  Browse Restaurants
                </motion.button>
              </motion.div>
            ) : (
              filteredOrders.map((order, index) => {
                const statusConfig = getStatusConfig(order.status);
                return (
                  <motion.div
                    key={order.id}
                    className="order-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    {/* Order Header */}
                    <div className="order-header">
                      <div className="restaurant-info">
                        <img src={order.restaurant?.image} alt={order.restaurant?.name} />
                        <div>
                          <h3>{order.restaurant?.name}</h3>
                          <p className="order-id">Order #{order.id}</p>
                          <p className="order-date">{formatDate(order.createdAt)}</p>
                        </div>
                      </div>
                      <Chip
                        icon={statusConfig.icon}
                        label={statusConfig.label}
                        color={statusConfig.color}
                        className="status-chip"
                      />
                    </div>

                    {/* Order Items */}
                    <div className="order-items">
                      {order.items?.slice(0, 3).map((item, i) => (
                        <span key={i} className="item-name">
                          {item.name} x{item.quantity}
                          {i < Math.min(order.items.length, 3) - 1 && ', '}
                        </span>
                      ))}
                      {order.items?.length > 3 && (
                        <span className="more-items">+{order.items.length - 3} more</span>
                      )}
                    </div>

                    {/* Order Footer */}
                    <div className="order-footer">
                      <div className="order-total">
                        <span>Total:</span>
                        <strong>₹{order.totalAmount}</strong>
                      </div>

                      <div className="order-actions">
                        {order.status === 'on_the_way' && (
                          <motion.button
                            className="action-btn track"
                            onClick={() => navigate(`/order-tracking/${order.id}`)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <LocalShipping />
                            Track Order
                          </motion.button>
                        )}

                        {order.status === 'delivered' && (
                          <>
                            <motion.button
                              className="action-btn reorder"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Replay />
                              Reorder
                            </motion.button>
                            {!order.rating && (
                              <motion.button
                                className="action-btn rate"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Star />
                                Rate
                              </motion.button>
                            )}
                          </>
                        )}

                        <motion.button
                          className="action-btn help"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Help
                        </motion.button>
                      </div>
                    </div>

                    {/* Rating (if delivered and rated) */}
                    {order.status === 'delivered' && order.rating && (
                      <div className="order-rating">
                        <Rating value={order.rating} readOnly size="small" />
                        <span className="rating-text">"{order.review}"</span>
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
};

export default Orders;