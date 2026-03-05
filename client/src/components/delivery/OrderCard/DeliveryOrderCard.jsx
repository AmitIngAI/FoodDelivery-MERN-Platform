import React from 'react';
import { motion } from 'framer-motion';
import {
  Restaurant,
  Person,
  LocationOn,
  AccessTime,
  AttachMoney,
  CheckCircle,
  Cancel,
  Phone,
  NavigateNext,
} from '@mui/icons-material';
import './DeliveryOrderCard.css';

// Available Order Card
export const AvailableOrderCard = ({ order, onAccept, onReject, index = 0 }) => {
  return (
    <motion.div
      className="delivery-order-card available"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      {/* Timer */}
      <div className="order-timer">
        <AccessTime />
        <span>Accept within 45s</span>
        <div className="timer-bar">
          <motion.div 
            className="timer-progress"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 45, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Locations */}
      <div className="order-locations">
        <div className="location-item pickup">
          <div className="location-icon">
            <Restaurant />
          </div>
          <div className="location-info">
            <span className="location-label">Pickup</span>
            <h4>{order.restaurant?.name || 'Restaurant'}</h4>
            <p>{order.restaurant?.address || 'Address'}</p>
          </div>
        </div>
        
        <div className="route-connector">
          <div className="connector-line" />
          <span className="connector-distance">{order.distance || '3.5 km'}</span>
        </div>

        <div className="location-item dropoff">
          <div className="location-icon">
            <Person />
          </div>
          <div className="location-info">
            <span className="location-label">Drop-off</span>
            <h4>{order.customer?.name || 'Customer'}</h4>
            <p>{order.customer?.address || 'Address'}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="order-quick-details">
        <div className="detail">
          <span>Items</span>
          <strong>{order.items?.length || 3}</strong>
        </div>
        <div className="detail">
          <span>Time</span>
          <strong>{order.estimatedTime || '25 min'}</strong>
        </div>
        <div className="detail earning">
          <span>Earn</span>
          <strong>₹{order.deliveryFee || 50}</strong>
        </div>
      </div>

      {/* Actions */}
      <div className="order-actions">
        <button className="btn-reject" onClick={() => onReject?.(order.id)}>
          <Cancel />
          Reject
        </button>
        <button className="btn-accept" onClick={() => onAccept?.(order.id)}>
          <CheckCircle />
          Accept
        </button>
      </div>
    </motion.div>
  );
};

// Active Order Card
export const ActiveOrderCard = ({ order, onClick, index = 0 }) => {
  const statusColors = {
    accepted: 'info',
    at_restaurant: 'warning',
    picked_up: 'primary',
    on_the_way: 'secondary',
  };

  return (
    <motion.div
      className={`delivery-order-card active ${statusColors[order.status] || 'info'}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
    >
      <div className="active-order-header">
        <div className="order-id">#{order.id}</div>
        <span className={`status-badge ${order.status}`}>
          {order.status?.replace('_', ' ') || 'Active'}
        </span>
      </div>

      <div className="active-order-body">
        <div className="order-party">
          <Restaurant />
          <span>{order.restaurant?.name}</span>
        </div>
        <div className="order-party">
          <Person />
          <span>{order.customer?.name}</span>
        </div>
      </div>

      <div className="active-order-footer">
        <div className="order-earning">
          <span>Earning</span>
          <strong>₹{order.deliveryFee || 50}</strong>
        </div>
        <NavigateNext className="arrow-icon" />
      </div>
    </motion.div>
  );
};

// Completed Order Card
export const CompletedOrderCard = ({ order, index = 0 }) => {
  return (
    <motion.div
      className="delivery-order-card completed"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="completed-header">
        <img src={order.restaurant?.image} alt="" />
        <div className="completed-info">
          <h4>{order.restaurant?.name}</h4>
          <p>To: {order.customer?.name}</p>
          <span className="completed-time">
            <CheckCircle /> Delivered at {new Date(order.deliveredAt).toLocaleTimeString()}
          </span>
        </div>
        <div className="completed-earning">
          <span>Earned</span>
          <strong>₹{order.deliveryFee}</strong>
        </div>
      </div>
      
      {order.rating && (
        <div className="completed-rating">
          ⭐ Customer rated you {order.rating}/5
        </div>
      )}
    </motion.div>
  );
};

export default AvailableOrderCard;