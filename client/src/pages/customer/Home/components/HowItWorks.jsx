import React from 'react';
import { Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: '📍',
      title: 'Select Location',
      description: 'Choose your delivery location to find nearby restaurants',
      color: '#FF6B6B',
      image: 'https://img.icons8.com/3d-fluency/200/map-marker.png',
    },
    {
      id: 2,
      icon: '🍕',
      title: 'Choose Restaurant',
      description: 'Browse menus and select your favorite dishes',
      color: '#4ECDC4',
      image: 'https://img.icons8.com/3d-fluency/200/restaurant.png',
    },
    {
      id: 3,
      icon: '💳',
      title: 'Make Payment',
      description: 'Pay securely with multiple payment options',
      color: '#FFE66D',
      image: 'https://img.icons8.com/3d-fluency/200/credit-card.png',
    },
    {
      id: 4,
      icon: '🚀',
      title: 'Fast Delivery',
      description: 'Enjoy your food delivered hot at your doorstep',
      color: '#A855F7',
      image: 'https://img.icons8.com/3d-fluency/200/delivery-scooter.png',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="how-it-works-section section">
      {/* Background */}
      <div className="hiw-background">
        <div className="hiw-shape shape-1"></div>
        <div className="hiw-shape shape-2"></div>
        <div className="hiw-shape shape-3"></div>
      </div>

      <Container>
        {/* Section Header */}
        <div className="section-header" data-aos="fade-up">
          <span className="section-badge">
            <span className="badge-icon">🎯</span>
            Simple Process
          </span>
          <h2 className="section-title">
            How It <span>Works?</span>
          </h2>
          <p className="section-subtitle">
            Get your favorite food in just 4 simple steps
          </p>
        </div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Grid container spacing={4} className="steps-grid">
            {steps.map((step, index) => (
              <Grid item xs={12} sm={6} lg={3} key={step.id}>
                <motion.div variants={itemVariants}>
                  <div className="step-card" data-aos="fade-up" data-aos-delay={index * 100}>
                    {/* Step Number */}
                    <div 
                      className="step-number"
                      style={{ background: `${step.color}20`, color: step.color }}
                    >
                      {String(step.id).padStart(2, '0')}
                    </div>

                    {/* Icon */}
                    <motion.div 
                      className="step-icon-wrapper"
                      style={{ background: `${step.color}15` }}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <img src={step.image} alt={step.title} className="step-icon-img" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>

                    {/* Connector */}
                    {index < steps.length - 1 && (
                      <div className="step-connector">
                        <svg width="100" height="30" viewBox="0 0 100 30">
                          <path 
                            d="M0,15 Q50,0 100,15" 
                            fill="none" 
                            stroke={step.color}
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                          <circle cx="100" cy="15" r="4" fill={step.color} />
                        </svg>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="hiw-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="cta-content">
            <div className="cta-text">
              <h3>Ready to Order?</h3>
              <p>Download our app and get ₹100 OFF on your first order!</p>
            </div>
            <div className="cta-buttons">
              <motion.button 
                className="cta-btn primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Order Now
              </motion.button>
              <motion.button 
                className="cta-btn secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download App
              </motion.button>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="cta-floats">
            <motion.span 
              className="float-emoji"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🍔
            </motion.span>
            <motion.span 
              className="float-emoji"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            >
              🍕
            </motion.span>
            <motion.span 
              className="float-emoji"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            >
              🍜
            </motion.span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HowItWorks;