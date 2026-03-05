import React from 'react';
import { Container, Grid } from '@mui/material';
import { 
  Apple, 
  Android, 
  CheckCircle,
  Smartphone,
  FlashOn,
  LocalOffer,
  Notifications,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import './AppDownload.css';

const AppDownload = () => {
  const features = [
    {
      icon: <FlashOn />,
      title: 'Lightning Fast',
      description: 'Order in just 30 seconds',
    },
    {
      icon: <LocalOffer />,
      title: 'Exclusive Offers',
      description: 'App-only discounts & deals',
    },
    {
      icon: <Notifications />,
      title: 'Real-time Tracking',
      description: 'Track your order live',
    },
    {
      icon: <Smartphone />,
      title: 'Easy Payments',
      description: 'Multiple payment options',
    },
  ];

  const appStats = [
    { value: '10M+', label: 'Downloads' },
    { value: '4.8⭐', label: 'Rating' },
    { value: '50K+', label: 'Reviews' },
  ];

  return (
    <section className="app-download-section section">
      {/* Background */}
      <div className="app-download-bg">
        <div className="bg-gradient"></div>
        <div className="bg-pattern"></div>
        <div className="floating-icons">
          <motion.span 
            className="float-icon fi1"
            animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          >
            🍕
          </motion.span>
          <motion.span 
            className="float-icon fi2"
            animate={{ y: [0, -25, 0], rotate: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, delay: 1 }}
          >
            🍔
          </motion.span>
          <motion.span 
            className="float-icon fi3"
            animate={{ y: [0, -35, 0], rotate: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 7, delay: 2 }}
          >
            🍜
          </motion.span>
          <motion.span 
            className="float-icon fi4"
            animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
          >
            🍰
          </motion.span>
        </div>
      </div>

      <Container>
        <Grid container spacing={6} alignItems="center">
          {/* Phone Mockup */}
          <Grid item xs={12} md={6}>
            <motion.div 
              className="phone-mockup-wrapper"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="phone-container">
                {/* Main Phone */}
                <motion.div 
                  className="phone phone-main"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <div className="phone-screen">
                    <img 
                      src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600" 
                      alt="App Screenshot"
                    />
                    <div className="screen-overlay">
                      <div className="app-ui">
                        <div className="ui-header">
                          <span className="ui-logo">🍕</span>
                          <span className="ui-title">FoodDelivery Pro</span>
                        </div>
                        <div className="ui-search">
                          <span>Search for food...</span>
                        </div>
                        <div className="ui-cards">
                          <div className="ui-card"></div>
                          <div className="ui-card"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="phone-notch"></div>
                </motion.div>

                {/* Secondary Phone */}
                <motion.div 
                  className="phone phone-secondary"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="phone-screen">
                    <img 
                      src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600" 
                      alt="App Screenshot 2"
                    />
                    <div className="screen-overlay dark">
                      <div className="tracking-ui">
                        <div className="tracking-header">
                          <span>📍 Order Tracking</span>
                        </div>
                        <div className="tracking-map"></div>
                        <div className="tracking-info">
                          <span className="tracking-status">🚀 On the way!</span>
                          <span className="tracking-time">15 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div 
                  className="floating-card fc1"
                  animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <span className="fc-icon">🛒</span>
                  <span className="fc-text">Order Placed!</span>
                </motion.div>

                <motion.div 
                  className="floating-card fc2"
                  animate={{ y: [0, -8, 0], x: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                >
                  <span className="fc-icon">⭐</span>
                  <span className="fc-text">4.9 Rating</span>
                </motion.div>

                <motion.div 
                  className="floating-card fc3"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 5, delay: 2 }}
                >
                  <span className="fc-icon">🎉</span>
                  <span className="fc-text">50% OFF</span>
                </motion.div>
              </div>
            </motion.div>
          </Grid>

          {/* Content */}
          <Grid item xs={12} md={6}>
            <motion.div 
              className="app-download-content"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-badge light">
                <span className="badge-icon">📱</span>
                Download Now
              </span>

              <h2 className="app-title">
                Get the App for <span>Better Experience</span>
              </h2>

              <p className="app-description">
                Download our app and enjoy exclusive offers, faster ordering, real-time tracking, and much more. Your favorite food is just a tap away!
              </p>

              {/* Features */}
              <div className="app-features">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="app-feature"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="feature-icon">
                      {feature.icon}
                    </div>
                    <div className="feature-content">
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Download Buttons */}
              <div className="download-buttons">
                <motion.a 
                  href="#" 
                  className="download-btn ios"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Apple />
                  <div className="btn-text">
                    <span className="btn-label">Download on the</span>
                    <span className="btn-store">App Store</span>
                  </div>
                </motion.a>

                <motion.a 
                  href="#" 
                  className="download-btn android"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Android />
                  <div className="btn-text">
                    <span className="btn-label">GET IT ON</span>
                    <span className="btn-store">Google Play</span>
                  </div>
                </motion.a>
              </div>

              {/* App Stats */}
              <div className="app-stats">
                {appStats.map((stat, index) => (
                  <div key={index} className="app-stat">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* QR Code */}
              <div className="qr-section">
                <div className="qr-code">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://fooddelivery.app" 
                    alt="QR Code"
                  />
                </div>
                <div className="qr-text">
                  <p>Scan to Download</p>
                  <span>Point your camera at the QR code</span>
                </div>
              </div>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default AppDownload;