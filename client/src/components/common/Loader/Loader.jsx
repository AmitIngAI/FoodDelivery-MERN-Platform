import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

// 🔄 Full Page Loader
export const PageLoader = ({ message = "Loading delicious food..." }) => {
  return (
    <motion.div 
      className="page-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="page-loader-content">
        {/* Animated Food Icons */}
        <div className="food-animation">
          <motion.span 
            className="food-icon"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              delay: 0 
            }}
          >
            🍕
          </motion.span>
          <motion.span 
            className="food-icon"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              delay: 0.2 
            }}
          >
            🍔
          </motion.span>
          <motion.span 
            className="food-icon"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              delay: 0.4 
            }}
          >
            🍜
          </motion.span>
        </div>

        {/* Spinner */}
        <div className="loader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>

        {/* Message */}
        <motion.p 
          className="loader-message"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
};

// 🔘 Button Loader / Small Spinner
export const ButtonLoader = ({ size = 'md', color = 'white' }) => {
  const sizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <motion.div 
      className={`button-loader ${color}`}
      style={{ width: sizes[size], height: sizes[size] }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <svg viewBox="0 0 24 24" fill="none">
        <circle 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="31.4 31.4"
        />
      </svg>
    </motion.div>
  );
};

// 📦 Skeleton Loader
export const Skeleton = ({ 
  width = '100%', 
  height = 20, 
  borderRadius = 8,
  className = '' 
}) => {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{ 
        width, 
        height, 
        borderRadius 
      }}
    />
  );
};

// 🃏 Card Skeleton
export const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="card-skeleton">
          <Skeleton height={180} borderRadius={16} className="card-skeleton-image" />
          <div className="card-skeleton-content">
            <Skeleton width="70%" height={24} />
            <Skeleton width="50%" height={16} />
            <div className="card-skeleton-row">
              <Skeleton width="30%" height={16} />
              <Skeleton width="30%" height={16} />
            </div>
            <Skeleton width="40%" height={20} />
          </div>
        </div>
      ))}
    </>
  );
};

// 🍽️ Restaurant Card Skeleton
export const RestaurantCardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="restaurant-card-skeleton">
          <Skeleton height={200} borderRadius="16px 16px 0 0" />
          <div className="restaurant-skeleton-body">
            <div className="restaurant-skeleton-header">
              <Skeleton width="60%" height={22} />
              <Skeleton width={50} height={24} borderRadius={20} />
            </div>
            <Skeleton width="80%" height={16} />
            <div className="restaurant-skeleton-footer">
              <Skeleton width="25%" height={14} />
              <Skeleton width="25%" height={14} />
              <Skeleton width="25%" height={14} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// 🍕 Menu Item Skeleton
export const MenuItemSkeleton = ({ count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="menu-item-skeleton">
          <div className="menu-item-skeleton-content">
            <Skeleton width={20} height={20} borderRadius={4} />
            <div className="menu-item-skeleton-text">
              <Skeleton width="70%" height={20} />
              <Skeleton width="90%" height={14} />
              <Skeleton width="30%" height={18} />
            </div>
          </div>
          <Skeleton width={120} height={100} borderRadius={12} />
        </div>
      ))}
    </>
  );
};

// 📋 Order Card Skeleton
export const OrderCardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="order-card-skeleton">
          <div className="order-skeleton-header">
            <Skeleton width={60} height={60} borderRadius={12} />
            <div className="order-skeleton-info">
              <Skeleton width="50%" height={20} />
              <Skeleton width="70%" height={14} />
              <Skeleton width="30%" height={14} />
            </div>
            <Skeleton width={80} height={28} borderRadius={20} />
          </div>
          <div className="order-skeleton-divider" />
          <div className="order-skeleton-footer">
            <Skeleton width="40%" height={16} />
            <Skeleton width={100} height={36} borderRadius={20} />
          </div>
        </div>
      ))}
    </>
  );
};

// 🔄 Inline Loader (for sections)
export const InlineLoader = ({ text = "Loading..." }) => {
  return (
    <div className="inline-loader">
      <ButtonLoader size="md" color="primary" />
      <span>{text}</span>
    </div>
  );
};

// 🎯 Overlay Loader
export const OverlayLoader = ({ isVisible, message = "Please wait..." }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="overlay-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="overlay-loader-content">
            <ButtonLoader size="lg" color="white" />
            <p>{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Default Export
const Loader = PageLoader;
export default Loader;