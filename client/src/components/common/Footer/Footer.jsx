import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, TextField, IconButton } from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  Email,
  Phone,
  LocationOn,
  Send,
  ArrowUpward,
  Favorite,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Subscribed successfully! 🎉');
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Team', path: '/team' },
      { name: 'Blog', path: '/blog' },
      { name: 'Press', path: '/press' },
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Safety', path: '/safety' },
      { name: 'Cancellation', path: '/cancellation' },
      { name: 'Refund Policy', path: '/refund' },
      { name: 'Report Issue', path: '/report' },
    ],
    legal: [
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Disclaimer', path: '/disclaimer' },
    ],
    partners: [
      { name: 'Partner with Us', path: '/partner' },
      { name: 'Ride with Us', path: '/rider' },
      { name: 'For Corporates', path: '/corporate' },
      { name: 'Franchise', path: '/franchise' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook />, url: '#', color: '#1877F2' },
    { icon: <Twitter />, url: '#', color: '#1DA1F2' },
    { icon: <Instagram />, url: '#', color: '#E4405F' },
    { icon: <LinkedIn />, url: '#', color: '#0A66C2' },
    { icon: <YouTube />, url: '#', color: '#FF0000' },
  ];

  const paymentMethods = [
    'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
    'https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg',
  ];

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <Container>
          <motion.div 
            className="newsletter-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="newsletter-content">
              <h3>🍕 Get Exclusive Offers!</h3>
              <p>Subscribe to our newsletter and get 20% OFF on your first order</p>
            </div>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="input-wrapper">
                <Email className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <motion.button 
                type="submit"
                className="subscribe-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Subscribe</span>
                <Send />
              </motion.button>
            </form>
          </motion.div>
        </Container>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <Container>
          <Grid container spacing={4}>
            {/* Brand Column */}
            <Grid item xs={12} md={4}>
              <div className="footer-brand">
                <Link to="/" className="footer-logo">
                  <img src="/logo.png" alt="Logo" />
                  <span>FoodDelivery Pro</span>
                </Link>
                <p className="footer-description">
                  Your favorite food, delivered fast. We bring the best restaurants to your doorstep with love and care.
                </p>
                
                {/* Contact Info */}
                <div className="contact-info">
                  <div className="contact-item">
                    <LocationOn />
                    <span>123 Food Street, Bangalore - 560001</span>
                  </div>
                  <div className="contact-item">
                    <Phone />
                    <span>+91 1800-123-4567</span>
                  </div>
                  <div className="contact-item">
                    <Email />
                    <span>support@fooddeliverypro.com</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      className="social-link"
                      style={{ '--hover-color': social.color }}
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </Grid>

            {/* Links Columns */}
            <Grid item xs={6} sm={3} md={2}>
              <div className="footer-links-column">
                <h4>Company</h4>
                <ul>
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <div className="footer-links-column">
                <h4>Support</h4>
                <ul>
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <div className="footer-links-column">
                <h4>Legal</h4>
                <ul>
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <div className="footer-links-column">
                <h4>Partners</h4>
                <ul>
                  {footerLinks.partners.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Grid>
          </Grid>

          {/* App Download */}
          <div className="footer-apps">
            <div className="apps-content">
              <h4>📱 Download Our App</h4>
              <div className="app-buttons">
                <a href="#" className="app-btn">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="App Store"
                  />
                </a>
                <a href="#" className="app-btn">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Play Store"
                  />
                </a>
              </div>
            </div>
            <div className="payment-methods">
              <h4>💳 We Accept</h4>
              <div className="payment-icons">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="payment-icon">
                    <img src={method} alt="Payment Method" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <Container>
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} FoodDelivery Pro. All rights reserved.
            </p>
            <p className="made-with">
              Made with <Favorite className="heart-icon" /> in India 🇮🇳
            </p>
          </div>
        </Container>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        className="scroll-to-top"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUpward />
      </motion.button>
    </footer>
  );
};

export default Footer;