import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Stepper, Step, StepLabel, Avatar, IconButton } from '@mui/material';
import {
  CheckCircle,
  Restaurant,
  TwoWheeler,
  Home,
  Phone,
  Chat,
  ArrowBack,
  AccessTime,
  LocalOffer,
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { motion } from 'framer-motion';
import { updateOrderStatus } from '../../../redux/slices/customerSlice';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './OrderTracking.css';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { orders } = useSelector(state => state.customer);
  const order = orders.find(o => o.id === orderId);
  
  const [activeStep, setActiveStep] = useState(1);
  const [driverLocation, setDriverLocation] = useState(
    order?.driverLocation || { lat: 12.9716, lng: 77.5946 }
  );
  const [eta, setEta] = useState('25-30');

  const deliveryLocation = {
    lat: 12.9352,
    lng: 77.6245,
  };

  const steps = [
    { label: 'Order Confirmed', icon: CheckCircle, time: '2 mins ago' },
    { label: 'Preparing', icon: Restaurant, time: '~15 mins' },
    { label: 'Out for Delivery', icon: TwoWheeler, time: '~20 mins' },
    { label: 'Delivered', icon: Home, time: '' },
  ];

  // Simulate real-time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.3) * 0.002,
        lng: prev.lng + (Math.random() - 0.3) * 0.002,
      }));

      // Simulate step progress
      if (activeStep < 3) {
        const shouldProgress = Math.random() > 0.95;
        if (shouldProgress) {
          setActiveStep(prev => prev + 1);
          dispatch(updateOrderStatus({
            orderId,
            status: steps[activeStep + 1].label.toLowerCase(),
          }));
        }
      }

      // Update ETA
      setEta(prev => {
        const [min, max] = prev.split('-').map(Number);
        if (min > 5) {
          return `${min - 1}-${max - 1}`;
        }
        return prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [activeStep]);

  if (!order) {
    return (
      <div className="tracking-page not-found">
        <Container>
          <h2>Order not found</h2>
          <p>The order you're looking for doesn't exist.</p>
          <motion.button
            onClick={() => navigate('/orders')}
            whileHover={{ scale: 1.05 }}
          >
            View All Orders
          </motion.button>
        </Container>
      </div>
    );
  }

  return (
    <div className="tracking-page">
      <Container>
        {/* Header */}
        <div className="tracking-header">
          <motion.button
            className="back-btn"
            onClick={() => navigate('/orders')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowBack />
          </motion.button>
          <div className="header-info">
            <h1>Track Order</h1>
            <p className="order-id">Order #{order.id}</p>
          </div>
        </div>

        {/* Status Card */}
        <motion.div
          className="status-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="eta-display">
            <AccessTime className="eta-icon" />
            <div>
              <span className="eta-label">Arriving in</span>
              <h2 className="eta-time">{eta} mins</h2>
            </div>
            <motion.div
              className="eta-animation"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🛵
            </motion.div>
          </div>

          <Stepper activeStep={activeStep} alternativeLabel className="order-stepper">
            {steps.map((step, index) => (
              <Step key={step.label} completed={index < activeStep}>
                <StepLabel
                  StepIconComponent={() => (
                    <motion.div
                      className={`step-icon ${index <= activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
                      animate={index === activeStep ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <step.icon />
                    </motion.div>
                  )}
                >
                  <span className="step-label">{step.label}</span>
                  {step.time && <span className="step-time">{step.time}</span>}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </motion.div>

        {/* Map */}
        <motion.div
          className="map-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MapContainer
            center={[driverLocation.lat, driverLocation.lng]}
            zoom={14}
            style={{ height: '400px', width: '100%', borderRadius: '20px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap'
            />
            
            {/* Driver Marker */}
            <Marker position={[driverLocation.lat, driverLocation.lng]}>
              <Popup>
                <div className="marker-popup">
                  <strong>🛵 {order.driver?.name}</strong>
                  <p>On the way!</p>
                </div>
              </Popup>
            </Marker>

            {/* Delivery Location */}
            <Marker position={[deliveryLocation.lat, deliveryLocation.lng]}>
              <Popup>
                <div className="marker-popup">
                  <strong>📍 Delivery Location</strong>
                  <p>{order.address?.address}</p>
                </div>
              </Popup>
            </Marker>

            {/* Route */}
            <Polyline
              positions={[
                [driverLocation.lat, driverLocation.lng],
                [deliveryLocation.lat, deliveryLocation.lng],
              ]}
              color="#FF6B6B"
              weight={4}
              dashArray="10, 10"
            />
          </MapContainer>
        </motion.div>

        {/* Driver & Order Info */}
        <div className="info-grid">
          {/* Driver Card */}
          <motion.div
            className="driver-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Delivery Partner</h3>
            <div className="driver-info">
              <Avatar
                src={order.driver?.avatar}
                className="driver-avatar"
              />
              <div className="driver-details">
                <h4>{order.driver?.name}</h4>
                <div className="driver-rating">
                  ⭐ {order.driver?.rating} • 500+ deliveries
                </div>
                <span className="vehicle-number">🏍️ {order.driver?.vehicle}</span>
              </div>
              <div className="driver-actions">
                <motion.button
                  className="action-btn call"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Phone />
                </motion.button>
                <motion.button
                  className="action-btn chat"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Chat />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            className="order-details-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3>Order Details</h3>
            
            <div className="restaurant-row">
              <img src={order.restaurant?.image} alt={order.restaurant?.name} />
              <div>
                <h4>{order.restaurant?.name}</h4>
                <p>{order.items?.length} items</p>
              </div>
            </div>

            <div className="items-list">
              {order.items?.map((item) => (
                <div key={item.id} className="order-item">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="order-total">
              <span>Total Paid</span>
              <span className="total-amount">₹{order.totalAmount}</span>
            </div>
          </motion.div>
        </div>

        {/* Delivery Address */}
        <motion.div
          className="delivery-address-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>📍 Delivering To</h3>
          <div className="address-details">
            <strong>{order.address?.name}</strong>
            <p>{order.address?.address}</p>
            <p>{order.address?.city} - {order.address?.pincode}</p>
            <p className="phone">📞 {order.address?.phone}</p>
          </div>
        </motion.div>

        {/* Help Button */}
        <motion.div
          className="help-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="help-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Need Help with your order?
          </motion.button>
        </motion.div>
      </Container>
    </div>
  );
};

export default OrderTracking;