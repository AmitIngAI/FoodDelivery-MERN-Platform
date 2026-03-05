import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LocalShipping,
  Restaurant,
  Person,
  Phone,
  LocationOn,
  Navigation,
  CheckCircle,
  AccessTime,
  Receipt,
  Chat,
  MoreVert,
  ArrowBack,
  MyLocation,
  DirectionsBike,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { updateDeliveryStatus, completeDelivery } from '../../../redux/slices/deliverySlice';
import MapView from '../../../components/delivery/MapView/MapView';
import './ActiveDelivery.css';

const ActiveDelivery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentDelivery, isOnDelivery } = useSelector(state => state.delivery);
  const [currentStep, setCurrentStep] = useState(0);

  // Mock delivery data
  const mockDelivery = currentDelivery || {
    id: 'ORD101',
    status: 'accepted',
    restaurant: {
      name: 'Pizza Paradise',
      address: '123, MG Road, Koramangala',
      phone: '+91 9876543210',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200',
      location: { lat: 12.9352, lng: 77.6245 }
    },
    customer: {
      name: 'Rahul Sharma',
      address: '456, HSR Layout, Sector 2',
      phone: '+91 9988776655',
      location: { lat: 12.9121, lng: 77.6446 }
    },
    items: [
      { name: 'Margherita Pizza', quantity: 2 },
      { name: 'Garlic Bread', quantity: 1 },
      { name: 'Coke', quantity: 2 }
    ],
    totalAmount: 650,
    deliveryFee: 50,
    paymentMethod: 'Online Paid',
    estimatedTime: '25-30 min',
    distance: '3.5 km',
    createdAt: new Date().toISOString(),
  };

  const deliverySteps = [
    { id: 0, label: 'Order Accepted', status: 'accepted', icon: <CheckCircle /> },
    { id: 1, label: 'Reached Restaurant', status: 'at_restaurant', icon: <Restaurant /> },
    { id: 2, label: 'Order Picked Up', status: 'picked_up', icon: <LocalShipping /> },
    { id: 3, label: 'On the Way', status: 'on_the_way', icon: <DirectionsBike /> },
    { id: 4, label: 'Delivered', status: 'delivered', icon: <CheckCircle /> },
  ];

  useEffect(() => {
    // Set initial step based on status
    const stepIndex = deliverySteps.findIndex(s => s.status === mockDelivery.status);
    setCurrentStep(stepIndex >= 0 ? stepIndex : 0);
  }, [mockDelivery.status]);

  const handleNextStep = () => {
    if (currentStep < deliverySteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      dispatch(updateDeliveryStatus({ 
        orderId: mockDelivery.id, 
        status: deliverySteps[nextStep].status 
      }));
      
      if (nextStep === deliverySteps.length - 1) {
        dispatch(completeDelivery(mockDelivery.id));
      }
    }
  };

  const getNextButtonText = () => {
    switch (currentStep) {
      case 0: return 'Reached Restaurant';
      case 1: return 'Picked Up Order';
      case 2: return 'Start Delivery';
      case 3: return 'Complete Delivery';
      default: return 'Next';
    }
  };

  if (!isOnDelivery && !mockDelivery) {
    return (
      <div className="no-active-delivery">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="no-delivery-content"
        >
          <LocalShipping />
          <h2>No Active Delivery</h2>
          <p>Accept an order to start delivering</p>
          <button onClick={() => navigate('/delivery/orders')} className="btn btn-primary">
            View Available Orders
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="active-delivery-page">
      {/* Header */}
      <header className="delivery-header">
        <button className="back-btn" onClick={() => navigate('/delivery/dashboard')}>
          <ArrowBack />
        </button>
        <div className="header-info">
          <h1>Active Delivery</h1>
          <span className="order-id">#{mockDelivery.id}</span>
        </div>
        <IconButton className="more-btn">
          <MoreVert />
        </IconButton>
      </header>

      {/* Map Section */}
      <div className="map-section">
        <MapView 
          pickup={mockDelivery.restaurant.location}
          dropoff={mockDelivery.customer.location}
          currentStep={currentStep}
        />
        <button className="center-location-btn">
          <MyLocation />
        </button>
      </div>

      {/* Delivery Details Panel */}
      <motion.div 
        className="delivery-panel"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        {/* Progress Steps */}
        <div className="progress-section">
          <div className="progress-track">
            {deliverySteps.map((step, index) => (
              <div 
                key={step.id}
                className={`progress-step ${index <= currentStep ? 'completed' : ''} ${index === currentStep ? 'current' : ''}`}
              >
                <div className="step-icon">{step.icon}</div>
                <span className="step-label">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Task */}
        <div className="current-task">
          <AnimatePresence mode="wait">
            {currentStep <= 1 ? (
              <motion.div
                key="pickup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="task-card pickup"
              >
                <div className="task-header">
                  <div className="task-icon">
                    <Restaurant />
                  </div>
                  <div className="task-title">
                    <span className="task-label">PICKUP FROM</span>
                    <h3>{mockDelivery.restaurant.name}</h3>
                  </div>
                  <a href={`tel:${mockDelivery.restaurant.phone}`} className="call-btn">
                    <Phone />
                  </a>
                </div>
                <div className="task-address">
                  <LocationOn />
                  <p>{mockDelivery.restaurant.address}</p>
                </div>
                <button className="navigate-btn">
                  <Navigation />
                  Navigate to Restaurant
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="dropoff"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="task-card dropoff"
              >
                <div className="task-header">
                  <div className="task-icon">
                    <Person />
                  </div>
                  <div className="task-title">
                    <span className="task-label">DELIVER TO</span>
                    <h3>{mockDelivery.customer.name}</h3>
                  </div>
                  <div className="contact-btns">
                    <a href={`tel:${mockDelivery.customer.phone}`} className="call-btn">
                      <Phone />
                    </a>
                    <button className="chat-btn">
                      <Chat />
                    </button>
                  </div>
                </div>
                <div className="task-address">
                  <LocationOn />
                  <p>{mockDelivery.customer.address}</p>
                </div>
                <button className="navigate-btn">
                  <Navigation />
                  Navigate to Customer
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="summary-header" onClick={() => {}}>
            <Receipt />
            <span>Order Summary</span>
            <span className="item-count">{mockDelivery.items.length} items</span>
          </div>
          <div className="summary-items">
            {mockDelivery.items.map((item, index) => (
              <div key={index} className="summary-item">
                <span className="item-qty">{item.quantity}x</span>
                <span className="item-name">{item.name}</span>
              </div>
            ))}
          </div>
          <div className="summary-footer">
            <div className="payment-info">
              <span>Payment: {mockDelivery.paymentMethod}</span>
              <strong>₹{mockDelivery.totalAmount}</strong>
            </div>
            <div className="earning-info">
              <span>Your Earning</span>
              <strong className="earning">₹{mockDelivery.deliveryFee}</strong>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {currentStep < deliverySteps.length - 1 && (
          <motion.button
            className="action-btn"
            onClick={handleNextStep}
            whileTap={{ scale: 0.98 }}
          >
            <CheckCircle />
            {getNextButtonText()}
          </motion.button>
        )}

        {currentStep === deliverySteps.length - 1 && (
          <motion.div 
            className="delivery-complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="complete-icon">🎉</div>
            <h3>Delivery Completed!</h3>
            <p>You earned ₹{mockDelivery.deliveryFee}</p>
            <button onClick={() => navigate('/delivery/dashboard')} className="done-btn">
              Back to Dashboard
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ActiveDelivery;