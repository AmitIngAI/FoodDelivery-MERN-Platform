import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AccessTime,
  CheckCircle,
  LocalShipping,
  RestaurantMenu,
  Cancel,
  Star,
  Replay,
  Receipt,
  KeyboardArrowRight,
  DeliveryDining,
} from '@mui/icons-material';
import './OrderCard.css';

const OrderCard = ({ order, index = 0 }) => {
  const navigate = useNavigate();

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: {
        label: 'Order Placed',
        icon: <Receipt />,
        color: 'warning',
        progress: 20,
      },
      confirmed: {
        label: 'Confirmed',
        icon: <CheckCircle />,
        color: 'info',
        progress: 40,
      },
      preparing: {
        label: 'Preparing',
        icon: <RestaurantMenu />,
        color: 'primary',
        progress: 60,
      },
      on_the_way: {
        label: 'On the Way',
        icon: <DeliveryDining />,
        color: 'secondary',
        progress: 80,
      },
      delivered: {
        label: 'Delivered',
        icon: <CheckCircle />,
        color: 'success',
        progress: 100,
      },
      cancelled: {
        label: 'Cancelled',
        icon: <Cancel />,
        color: 'danger',
        progress: 0,
      },
    };
    return statusMap[status] || statusMap.pending;
  };

  const statusInfo = getStatusInfo(order.status);

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

  const handleTrackOrder = () => {
    navigate(`/order-tracking/${order.id}`);
  };

  const handleReorder = () => {
    // Logic for reordering
    navigate(`/restaurant/${order.restaurantId}`);
  };

  const handleViewDetails = () => {
    navigate(`/orders/${order.id}`);
  };

  return (
    <motion.div
      className="order-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      {/* Header */}
      <div className="order-card-header">
        <div className="order-restaurant">
          <div className="restaurant-image">
            <img src={order.restaurant.image} alt={order.restaurant.name} />
          </div>
          <div className="restaurant-info">
            <h4>{order.restaurant.name}</h4>
            <p>{order.restaurant.address}</p>
          </div>
        </div>
        <div className={`order-status status-${statusInfo.color}`}>
          {statusInfo.icon}
          <span>{statusInfo.label}</span>
        </div>
      </div>

      {/* Progress Bar - Active Orders */}
      {!['delivered', 'cancelled'].includes(order.status) && (
        <div className="order-progress">
          <div 
            className="progress-bar"
            style={{ width: `${statusInfo.progress}%` }}
          />
          <div className="progress-steps">
            <div className={`step ${statusInfo.progress >= 20 ? 'active' : ''}`}>
              <div className="step-dot" />
              <span>Placed</span>
            </div>
            <div className={`step ${statusInfo.progress >= 40 ? 'active' : ''}`}>
              <div className="step-dot" />
              <span>Confirmed</span>
            </div>
            <div className={`step ${statusInfo.progress >= 60 ? 'active' : ''}`}>
              <div className="step-dot" />
              <span>Preparing</span>
            </div>
            <div className={`step ${statusInfo.progress >= 80 ? 'active' : ''}`}>
              <div className="step-dot" />
              <span>On the Way</span>
            </div>
            <div className={`step ${statusInfo.progress >= 100 ? 'active' : ''}`}>
              <div className="step-dot" />
              <span>Delivered</span>
            </div>
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="order-items">
        {order.items.slice(0, 3).map((item, idx) => (
          <div key={idx} className="order-item">
            <span className="item-qty">{item.quantity}x</span>
            <span className="item-name">{item.name}</span>
            <span className="item-price">₹{item.price * item.quantity}</span>
          </div>
        ))}
        {order.items.length > 3 && (
          <p className="more-items">+{order.items.length - 3} more items</p>
        )}
      </div>

      {/* Divider */}
      <div className="order-divider" />

      {/* Footer */}
      <div className="order-card-footer">
        <div className="order-meta">
          <div className="meta-item">
            <AccessTime />
            <span>{formatDate(order.createdAt)}</span>
          </div>
          <div className="meta-item">
            <span className="order-id">#{order.id}</span>
          </div>
        </div>

        <div className="order-total">
          <span>Total</span>
          <strong>₹{order.totalAmount}</strong>
        </div>
      </div>

      {/* Actions */}
      <div className="order-actions">
        {/* Delivered Orders - Show Rating & Reorder */}
        {order.status === 'delivered' && (
          <>
            {order.rating ? (
              <div className="order-rating">
                <Star className="rating-star" />
                <span>{order.rating}</span>
              </div>
            ) : (
              <button className="action-btn rate-btn" onClick={handleViewDetails}>
                <Star />
                Rate Order
              </button>
            )}
            <button className="action-btn reorder-btn" onClick={handleReorder}>
              <Replay />
              Reorder
            </button>
          </>
        )}

        {/* Active Orders - Track */}
        {['pending', 'confirmed', 'preparing', 'on_the_way'].includes(order.status) && (
          <button className="action-btn track-btn" onClick={handleTrackOrder}>
            <LocalShipping />
            Track Order
            <KeyboardArrowRight />
          </button>
        )}

        {/* View Details */}
        <button className="action-btn details-btn" onClick={handleViewDetails}>
          View Details
          <KeyboardArrowRight />
        </button>
      </div>

      {/* Driver Info - On the Way */}
      {order.status === 'on_the_way' && order.driver && (
        <motion.div 
          className="driver-info"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <div className="driver-details">
            <img src={order.driver.avatar} alt={order.driver.name} />
            <div>
              <h5>{order.driver.name}</h5>
              <p>{order.driver.vehicle}</p>
            </div>
          </div>
          <a href={`tel:${order.driver.phone}`} className="call-driver">
            📞 Call
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};

// Compact Order Card
export const OrderCardCompact = ({ order, onClick }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'var(--warning)',
      confirmed: 'var(--info)',
      preparing: 'var(--primary)',
      on_the_way: 'var(--secondary)',
      delivered: 'var(--success)',
      cancelled: 'var(--danger)',
    };
    return colors[status] || colors.pending;
  };

  return (
    <motion.div 
      className="order-card-compact"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div 
        className="compact-status-bar" 
        style={{ background: getStatusColor(order.status) }}
      />
      <div className="compact-content">
        <div className="compact-header">
          <img src={order.restaurant.image} alt={order.restaurant.name} />
          <div>
            <h5>{order.restaurant.name}</h5>
            <p>{order.items.length} items • ₹{order.totalAmount}</p>
          </div>
        </div>
        <KeyboardArrowRight className="compact-arrow" />
      </div>
    </motion.div>
  );
};

// Order List Item
export const OrderListItem = ({ order, onClick }) => {
  const statusInfo = {
    pending: { label: 'Pending', color: 'warning' },
    confirmed: { label: 'Confirmed', color: 'info' },
    preparing: { label: 'Preparing', color: 'primary' },
    on_the_way: { label: 'On the Way', color: 'secondary' },
    delivered: { label: 'Delivered', color: 'success' },
    cancelled: { label: 'Cancelled', color: 'danger' },
  };

  const status = statusInfo[order.status] || statusInfo.pending;

  return (
    <motion.div 
      className="order-list-item"
      whileHover={{ x: 5 }}
      onClick={onClick}
    >
      <div className="list-item-main">
        <div className="list-item-image">
          <img src={order.restaurant.image} alt="" />
        </div>
        <div className="list-item-content">
          <h5>{order.restaurant.name}</h5>
          <p className="list-item-items">
            {order.items.map(i => i.name).join(', ')}
          </p>
          <div className="list-item-meta">
            <span className={`status-badge ${status.color}`}>
              {status.label}
            </span>
            <span className="list-item-date">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="list-item-end">
        <span className="list-item-total">₹{order.totalAmount}</span>
        <KeyboardArrowRight />
      </div>
    </motion.div>
  );
};

export default OrderCard;