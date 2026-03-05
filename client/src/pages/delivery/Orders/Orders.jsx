import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LocalShipping,
  CheckCircle,
  Cancel,
  AccessTime,
  LocationOn,
  Phone,
  Restaurant,
  Person,
  AttachMoney,
  NavigateNext,
  FilterList,
} from '@mui/icons-material';
import { acceptOrder, rejectOrder } from '../../../redux/slices/deliverySlice';
import './Orders.css';

const DeliveryOrders = () => {
  const dispatch = useDispatch();
  const { availableOrders, activeOrders, completedOrders, isOnline } = useSelector(state => state.delivery);
  const [activeTab, setActiveTab] = useState('available');

  // Mock available orders
  const mockAvailableOrders = [
    {
      id: 'ORD101',
      restaurant: { name: 'Pizza Paradise', address: '123, MG Road', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200' },
      customer: { name: 'Rahul Sharma', address: '456, HSR Layout', phone: '+91 9876543210' },
      items: [{ name: 'Margherita Pizza', quantity: 2 }, { name: 'Coke', quantity: 2 }],
      totalAmount: 650,
      deliveryFee: 50,
      distance: '3.5 km',
      estimatedTime: '25-30 min',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'ORD102',
      restaurant: { name: 'Burger King', address: '789, Indiranagar', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' },
      customer: { name: 'Priya Patel', address: '321, Koramangala', phone: '+91 9988776655' },
      items: [{ name: 'Whopper', quantity: 1 }, { name: 'Fries', quantity: 1 }],
      totalAmount: 420,
      deliveryFee: 40,
      distance: '2.8 km',
      estimatedTime: '20-25 min',
      createdAt: new Date().toISOString(),
    },
  ];

  const mockCompletedOrders = [
    {
      id: 'ORD099',
      restaurant: { name: 'Royal Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200' },
      customer: { name: 'Amit Kumar' },
      totalAmount: 550,
      deliveryFee: 50,
      deliveredAt: '2024-01-16T10:30:00',
      rating: 5,
    },
    {
      id: 'ORD098',
      restaurant: { name: 'Dragon Wok', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200' },
      customer: { name: 'Sneha Gupta' },
      totalAmount: 780,
      deliveryFee: 45,
      deliveredAt: '2024-01-16T09:15:00',
      rating: 4,
    },
  ];

  const handleAccept = (orderId) => {
    dispatch(acceptOrder(orderId));
  };

  const handleReject = (orderId) => {
    dispatch(rejectOrder(orderId));
  };

  const tabs = [
    { id: 'available', label: 'Available', count: mockAvailableOrders.length },
    { id: 'active', label: 'Active', count: activeOrders.length },
    { id: 'completed', label: 'Completed', count: mockCompletedOrders.length },
  ];

  return (
    <div className="delivery-orders-page">
      {/* Header */}
      <header className="page-header">
        <div>
          <h1>Orders</h1>
          <p>Manage your delivery orders</p>
        </div>
        <button className="filter-btn">
          <FilterList />
          Filter
        </button>
      </header>

      {/* Tabs */}
      <div className="orders-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span className="tab-count">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="orders-content">
        <AnimatePresence mode="wait">
          {/* Available Orders */}
          {activeTab === 'available' && (
            <motion.div
              key="available"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="orders-list"
            >
              {!isOnline ? (
                <div className="offline-message">
                  <LocalShipping />
                  <h3>You're Offline</h3>
                  <p>Go online to receive new orders</p>
                </div>
              ) : mockAvailableOrders.length === 0 ? (
                <div className="no-orders">
                  <LocalShipping />
                  <h3>No orders available</h3>
                  <p>New orders will appear here</p>
                </div>
              ) : (
                mockAvailableOrders.map((order, index) => (
                  <AvailableOrderCard
                    key={order.id}
                    order={order}
                    index={index}
                    onAccept={handleAccept}
                    onReject={handleReject}
                  />
                ))
              )}
            </motion.div>
          )}

          {/* Active Orders */}
          {activeTab === 'active' && (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="orders-list"
            >
              {activeOrders.length === 0 ? (
                <div className="no-orders">
                  <LocalShipping />
                  <h3>No active deliveries</h3>
                  <p>Accept orders to start delivering</p>
                </div>
              ) : (
                activeOrders.map((order, index) => (
                  <ActiveOrderCard key={order.id} order={order} index={index} />
                ))
              )}
            </motion.div>
          )}

          {/* Completed Orders */}
          {activeTab === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="orders-list"
            >
              {mockCompletedOrders.map((order, index) => (
                <CompletedOrderCard key={order.id} order={order} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Available Order Card
const AvailableOrderCard = ({ order, index, onAccept, onReject }) => {
  return (
    <motion.div
      className="order-card available"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Timer */}
      <div className="order-timer">
        <AccessTime />
        <span>Accept within 60s</span>
      </div>

      {/* Restaurant Info */}
      <div className="order-section">
        <div className="section-icon pickup">
          <Restaurant />
        </div>
        <div className="section-content">
          <span className="section-label">PICKUP</span>
          <h4>{order.restaurant.name}</h4>
          <p>{order.restaurant.address}</p>
        </div>
        <img src={order.restaurant.image} alt="" className="section-image" />
      </div>

      {/* Divider */}
      <div className="route-line">
        <div className="line" />
        <span className="distance">{order.distance}</span>
      </div>

      {/* Customer Info */}
      <div className="order-section">
        <div className="section-icon dropoff">
          <Person />
        </div>
        <div className="section-content">
          <span className="section-label">DROP-OFF</span>
          <h4>{order.customer.name}</h4>
          <p>{order.customer.address}</p>
        </div>
      </div>

      {/* Order Details */}
      <div className="order-details">
        <div className="detail-item">
          <span>Items</span>
          <strong>{order.items.length} items</strong>
        </div>
        <div className="detail-item">
          <span>Est. Time</span>
          <strong>{order.estimatedTime}</strong>
        </div>
        <div className="detail-item earnings">
          <span>Earnings</span>
          <strong>₹{order.deliveryFee}</strong>
        </div>
      </div>

      {/* Actions */}
      <div className="order-actions">
        <button className="reject-btn" onClick={() => onReject(order.id)}>
          <Cancel />
          Reject
        </button>
        <button className="accept-btn" onClick={() => onAccept(order.id)}>
          <CheckCircle />
          Accept Order
        </button>
      </div>
    </motion.div>
  );
};

// Active Order Card
const ActiveOrderCard = ({ order, index }) => {
  return (
    <motion.div
      className="order-card active"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="order-header">
        <div className="order-id">#{order.id}</div>
        <span className={`status-badge ${order.status}`}>
          {order.status.replace('_', ' ')}
        </span>
      </div>

      <div className="order-info">
        <div className="info-row">
          <Restaurant />
          <span>{order.restaurant?.name}</span>
        </div>
        <div className="info-row">
          <Person />
          <span>{order.customer?.name}</span>
        </div>
        <div className="info-row">
          <LocationOn />
          <span>{order.customer?.address}</span>
        </div>
      </div>

      <button className="view-details-btn">
        View Details
        <NavigateNext />
      </button>
    </motion.div>
  );
};

// Completed Order Card
const CompletedOrderCard = ({ order, index }) => {
  return (
    <motion.div
      className="order-card completed"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="order-header">
        <div className="order-main">
          <img src={order.restaurant.image} alt="" />
          <div>
            <h4>{order.restaurant.name}</h4>
            <p>To: {order.customer.name}</p>
          </div>
        </div>
        <div className="order-earning">
          <span>Earned</span>
          <strong>₹{order.deliveryFee}</strong>
        </div>
      </div>

      <div className="order-footer">
        <div className="delivered-time">
          <CheckCircle />
          <span>Delivered at {new Date(order.deliveredAt).toLocaleTimeString()}</span>
        </div>
        {order.rating && (
          <div className="order-rating">
            ⭐ {order.rating}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DeliveryOrders;