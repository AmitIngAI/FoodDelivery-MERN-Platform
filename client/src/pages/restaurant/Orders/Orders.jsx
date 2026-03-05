import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Restaurant,
  LocalShipping,
  Timer,
  Phone,
  Print,
  Visibility,
  Refresh,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { updateOrderStatus } from '../../../redux/slices/restaurantSlice';
import { toast } from 'react-toastify';
import './Orders.css';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, activeOrders, completedOrders } = useSelector(state => state.restaurant);
  
  const [activeTab, setActiveTab] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  const tabs = [
    { label: 'New Orders', value: 'pending', count: orders.filter(o => o.status === 'pending').length },
    { label: 'Preparing', value: 'preparing', count: orders.filter(o => o.status === 'preparing').length },
    { label: 'Ready', value: 'ready', count: orders.filter(o => o.status === 'ready').length },
    { label: 'Completed', value: 'completed', count: completedOrders.length },
  ];

  const getFilteredOrders = () => {
    const status = tabs[activeTab].value;
    if (status === 'completed') {
      return orders.filter(o => ['delivered', 'cancelled'].includes(o.status));
    }
    return orders.filter(o => o.status === status);
  };

  const filteredOrders = getFilteredOrders();

  const handleStatusUpdate = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
    
    const messages = {
      'preparing': 'Order accepted and being prepared! 👨‍🍳',
      'ready': 'Order is ready for pickup! 🎉',
      'delivered': 'Order marked as delivered! ✅',
      'cancelled': 'Order has been cancelled ❌',
    };
    
    toast.success(messages[newStatus]);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  const getTimeSince = (dateString) => {
    const now = new Date();
    const orderTime = new Date(dateString);
    const diffInMinutes = Math.floor((now - orderTime) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: { bg: 'rgba(255, 193, 7, 0.1)', color: '#b8860b' },
      preparing: { bg: 'rgba(255, 107, 107, 0.1)', color: '#FF6B6B' },
      ready: { bg: 'rgba(6, 214, 160, 0.1)', color: '#06D6A0' },
      delivered: { bg: 'rgba(6, 214, 160, 0.1)', color: '#06D6A0' },
      cancelled: { bg: 'rgba(239, 71, 111, 0.1)', color: '#EF476F' },
    };
    return colors[status] || colors.pending;
  };

  // Simulate new order notification
  useEffect(() => {
    const interval = setInterval(() => {
      // Could add real-time order listening here
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="orders-page-restaurant">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Orders Management</h1>
          <p>Manage and track all your orders</p>
        </div>
        <motion.button
          className="refresh-btn"
          whileHover={{ scale: 1.05, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
        >
          <Refresh />
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="orders-tabs-container">
        <Tabs
          value={activeTab}
          onChange={(e, val) => setActiveTab(val)}
          className="orders-tabs"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={
                <div className="tab-label">
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className="tab-badge">{tab.count}</span>
                  )}
                </div>
              }
            />
          ))}
        </Tabs>
      </div>

      {/* Orders Grid */}
      <div className="orders-grid">
        <AnimatePresence>
          {filteredOrders.length === 0 ? (
            <motion.div
              className="no-orders"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png" alt="No orders" />
              <h3>No {tabs[activeTab].label.toLowerCase()} at the moment</h3>
              <p>New orders will appear here automatically</p>
            </motion.div>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <Card className={`order-card ${order.status}`}>
                  <CardContent>
                    {/* Order Header */}
                    <div className="order-card-header">
                      <div className="order-id-section">
                        <h3>#{order.id}</h3>
                        <Chip
                          label={order.status}
                          size="small"
                          style={{
                            background: getStatusColor(order.status).bg,
                            color: getStatusColor(order.status).color,
                          }}
                          className="status-chip"
                        />
                      </div>
                      <div className="order-time">
                        <Timer />
                        <span>{getTimeSince(order.createdAt)}</span>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="customer-info">
                      <Avatar src={order.customer.avatar} className="customer-avatar" />
                      <div className="customer-details">
                        <h4>{order.customer.name}</h4>
                        <p>{order.address}</p>
                      </div>
                      <IconButton className="call-btn">
                        <Phone />
                      </IconButton>
                    </div>

                    {/* Order Items */}
                    <div className="order-items-list">
                      {order.items.map((item, i) => (
                        <div key={i} className="order-item-row">
                          <span className="item-qty">{item.quantity}x</span>
                          <span className="item-name">{item.name}</span>
                          <span className="item-price">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Notes */}
                    {order.notes && (
                      <div className="order-notes">
                        <strong>📝 Note:</strong> {order.notes}
                      </div>
                    )}

                    {/* Order Footer */}
                    <div className="order-card-footer">
                      <div className="order-total">
                        <span>Total</span>
                        <strong>₹{order.totalAmount}</strong>
                      </div>

                      <div className="payment-info">
                        <Chip
                          label={order.paymentStatus}
                          size="small"
                          color={order.paymentStatus === 'paid' ? 'success' : 'warning'}
                        />
                        <span className="payment-method">{order.paymentMethod.toUpperCase()}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="order-actions">
                      {order.status === 'pending' && (
                        <>
                          <motion.button
                            className="action-btn accept"
                            onClick={() => handleStatusUpdate(order.id, 'preparing')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <CheckCircle />
                            Accept Order
                          </motion.button>
                          <motion.button
                            className="action-btn reject"
                            onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Cancel />
                            Reject
                          </motion.button>
                        </>
                      )}

                      {order.status === 'preparing' && (
                        <motion.button
                          className="action-btn ready"
                          onClick={() => handleStatusUpdate(order.id, 'ready')}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Restaurant />
                          Mark as Ready
                        </motion.button>
                      )}

                      {order.status === 'ready' && (
                        <motion.button
                          className="action-btn delivered"
                          onClick={() => handleStatusUpdate(order.id, 'delivered')}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <LocalShipping />
                          Mark as Delivered
                        </motion.button>
                      )}

                      <motion.button
                        className="action-btn view"
                        onClick={() => handleViewOrder(order)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Visibility />
                      </motion.button>

                      <motion.button
                        className="action-btn print"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Print />
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Order Detail Dialog */}
      <Dialog
        open={showOrderDetail}
        onClose={() => setShowOrderDetail(false)}
        maxWidth="sm"
        fullWidth
        className="order-detail-dialog"
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              <div className="dialog-header">
                <h3>Order #{selectedOrder.id}</h3>
                <Chip
                  label={selectedOrder.status}
                  style={{
                    background: getStatusColor(selectedOrder.status).bg,
                    color: getStatusColor(selectedOrder.status).color,
                  }}
                />
              </div>
            </DialogTitle>
            <DialogContent>
              <div className="order-detail-content">
                <div className="detail-section">
                  <h4>Customer Details</h4>
                  <div className="customer-detail">
                    <Avatar src={selectedOrder.customer.avatar} />
                    <div>
                      <p><strong>{selectedOrder.customer.name}</strong></p>
                      <p>{selectedOrder.customer.phone}</p>
                      <p>{selectedOrder.address}</p>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Order Items</h4>
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="detail-item">
                      <span>{item.quantity}x {item.name}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="detail-total">
                    <span>Total</span>
                    <span>₹{selectedOrder.totalAmount}</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Payment</h4>
                  <p>{selectedOrder.paymentMethod.toUpperCase()} - {selectedOrder.paymentStatus.toUpperCase()}</p>
                </div>

                {selectedOrder.notes && (
                  <div className="detail-section">
                    <h4>Special Instructions</h4>
                    <p>{selectedOrder.notes}</p>
                  </div>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowOrderDetail(false)}>Close</Button>
              <Button variant="contained" startIcon={<Print />}>
                Print Order
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Orders;