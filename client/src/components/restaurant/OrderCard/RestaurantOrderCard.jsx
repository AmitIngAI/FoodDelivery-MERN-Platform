import React, { useState } from 'react';
import {
  IconButton,
  Chip,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Collapse,
} from '@mui/material';
import {
  MoreVert,
  AccessTime,
  Person,
  Phone,
  LocationOn,
  ExpandMore,
  ExpandLess,
  Print,
  CheckCircle,
  LocalShipping,
  Restaurant,
  Cancel,
  Timer,
  CurrencyRupee,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import './RestaurantOrderCard.css';

const RestaurantOrderCard = ({ order, onStatusChange, onPrint }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const statusConfig = {
    pending: {
      label: 'New Order',
      color: '#FF6B6B',
      bgColor: 'rgba(255, 107, 107, 0.1)',
      icon: <AccessTime />,
    },
    confirmed: {
      label: 'Confirmed',
      color: '#118AB2',
      bgColor: 'rgba(17, 138, 178, 0.1)',
      icon: <CheckCircle />,
    },
    preparing: {
      label: 'Preparing',
      color: '#FFC43D',
      bgColor: 'rgba(255, 196, 61, 0.1)',
      icon: <Restaurant />,
    },
    ready: {
      label: 'Ready',
      color: '#06D6A0',
      bgColor: 'rgba(6, 214, 160, 0.1)',
      icon: <CheckCircle />,
    },
    picked_up: {
      label: 'Picked Up',
      color: '#4ECDC4',
      bgColor: 'rgba(78, 205, 196, 0.1)',
      icon: <LocalShipping />,
    },
    delivered: {
      label: 'Delivered',
      color: '#06D6A0',
      bgColor: 'rgba(6, 214, 160, 0.1)',
      icon: <CheckCircle />,
    },
    cancelled: {
      label: 'Cancelled',
      color: '#EF476F',
      bgColor: 'rgba(239, 71, 111, 0.1)',
      icon: <Cancel />,
    },
  };

  const currentStatus = statusConfig[order.status] || statusConfig.pending;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(order.id, newStatus);
    handleMenuClose();
  };

  const getNextStatus = () => {
    const flow = {
      pending: 'confirmed',
      confirmed: 'preparing',
      preparing: 'ready',
      ready: 'picked_up',
    };
    return flow[order.status];
  };

  const getNextStatusLabel = () => {
    const labels = {
      pending: 'Accept Order',
      confirmed: 'Start Preparing',
      preparing: 'Mark Ready',
      ready: 'Mark Picked Up',
    };
    return labels[order.status];
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeSince = (dateString) => {
    const now = new Date();
    const orderTime = new Date(dateString);
    const diffMs = now - orderTime;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ${diffMins % 60}m ago`;
  };

  return (
    <motion.div
      className={`restaurant-order-card ${order.status}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      {/* Order Header */}
      <div className="order-card-header">
        <div className="order-info">
          <div className="order-id-row">
            <h3 className="order-id">#{order.id}</h3>
            {order.status === 'pending' && (
              <span className="new-badge pulse">NEW</span>
            )}
          </div>
          <div className="order-time">
            <Timer fontSize="small" />
            <span>{formatTime(order.createdAt)}</span>
            <span className="time-ago">({getTimeSince(order.createdAt)})</span>
          </div>
        </div>

        <div className="order-header-right">
          <Chip
            icon={currentStatus.icon}
            label={currentStatus.label}
            className="status-chip"
            style={{
              backgroundColor: currentStatus.bgColor,
              color: currentStatus.color,
            }}
          />
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      {/* Customer Info */}
      <div className="customer-section">
        <Avatar className="customer-avatar">
          {order.customer?.name?.charAt(0) || 'C'}
        </Avatar>
        <div className="customer-details">
          <h4>{order.customer?.name || 'Customer'}</h4>
          <div className="customer-meta">
            <span className="customer-phone">
              <Phone fontSize="small" />
              {order.customer?.phone || '+91 9876543210'}
            </span>
            {order.customer?.orders && (
              <Chip
                size="small"
                label={`${order.customer.orders} orders`}
                className="orders-count"
              />
            )}
          </div>
        </div>
        <Tooltip title="Call Customer">
          <IconButton className="call-btn">
            <Phone />
          </IconButton>
        </Tooltip>
      </div>

      {/* Order Items */}
      <div className="order-items-section">
        <div
          className="items-header"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="items-count">
            {order.items?.length || 0} Items • ₹{order.totalAmount}
          </span>
          <IconButton size="small">
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </div>

        <Collapse in={expanded}>
          <div className="items-list">
            {order.items?.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-qty">{item.quantity}x</div>
                <div className="item-info">
                  <span className={`veg-indicator ${item.isVeg ? 'veg' : 'non-veg'}`}>
                    {item.isVeg ? '🟢' : '🔴'}
                  </span>
                  <span className="item-name">{item.name}</span>
                  {item.customizations && (
                    <span className="item-custom">
                      {item.customizations.join(', ')}
                    </span>
                  )}
                </div>
                <div className="item-price">₹{item.price * item.quantity}</div>
              </div>
            ))}

            {order.specialInstructions && (
              <div className="special-instructions">
                <strong>Note:</strong> {order.specialInstructions}
              </div>
            )}
          </div>
        </Collapse>

        {!expanded && (
          <div className="items-preview">
            {order.items?.slice(0, 2).map((item, index) => (
              <span key={index} className="preview-item">
                {item.quantity}x {item.name}
                {index < Math.min(order.items.length - 1, 1) && ', '}
              </span>
            ))}
            {order.items?.length > 2 && (
              <span className="more-items">
                +{order.items.length - 2} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Delivery Info */}
      <div className="delivery-section">
        <div className="delivery-type">
          <Chip
            label={order.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}
            size="small"
            icon={order.deliveryType === 'delivery' ? <LocalShipping /> : <Person />}
            className="delivery-chip"
          />
          {order.estimatedTime && (
            <span className="est-time">
              <AccessTime fontSize="small" />
              {order.estimatedTime}
            </span>
          )}
        </div>

        {order.deliveryType === 'delivery' && order.address && (
          <div className="delivery-address">
            <LocationOn />
            <span>
              {order.address.address}, {order.address.city} - {order.address.pincode}
            </span>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{order.subtotal}</span>
        </div>
        {order.deliveryFee > 0 && (
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹{order.deliveryFee}</span>
          </div>
        )}
        {order.discount > 0 && (
          <div className="summary-row discount">
            <span>Discount</span>
            <span>-₹{order.discount}</span>
          </div>
        )}
        <div className="summary-row total">
          <span>Total</span>
          <span>
            <CurrencyRupee fontSize="small" />
            {order.totalAmount}
          </span>
        </div>
        <Chip
          size="small"
          label={order.paymentMethod?.toUpperCase() || 'CASH'}
          className={`payment-chip ${order.paymentStatus}`}
        />
      </div>

      {/* Action Buttons */}
      <div className="order-actions">
        {order.status === 'pending' && (
          <>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Cancel />}
              onClick={() => handleStatusChange('cancelled')}
              className="reject-btn"
            >
              Reject
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckCircle />}
              onClick={() => handleStatusChange('confirmed')}
              className="accept-btn"
            >
              Accept Order
            </Button>
          </>
        )}

        {['confirmed', 'preparing', 'ready'].includes(order.status) && (
          <>
            <Button
              variant="outlined"
              startIcon={<Print />}
              onClick={() => onPrint(order)}
              className="print-btn"
            >
              Print
            </Button>
            <Button
              variant="contained"
              onClick={() => handleStatusChange(getNextStatus())}
              className="next-status-btn"
            >
              {getNextStatusLabel()}
            </Button>
          </>
        )}
      </div>

      {/* Status Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        className="status-menu"
      >
        <MenuItem onClick={() => onPrint(order)}>
          <Print /> Print Order
        </MenuItem>
        {order.status !== 'cancelled' && order.status !== 'delivered' && (
          <>
            <MenuItem onClick={() => handleStatusChange('confirmed')}>
              <CheckCircle /> Mark Confirmed
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange('preparing')}>
              <Restaurant /> Mark Preparing
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange('ready')}>
              <CheckCircle /> Mark Ready
            </MenuItem>
            <MenuItem
              onClick={() => handleStatusChange('cancelled')}
              className="cancel-option"
            >
              <Cancel /> Cancel Order
            </MenuItem>
          </>
        )}
      </Menu>
    </motion.div>
  );
};

export default RestaurantOrderCard;