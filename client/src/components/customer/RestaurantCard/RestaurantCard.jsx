import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Star,
  AccessTime,
  LocationOn,
  Favorite,
  FavoriteBorder,
  LocalOffer,
  Verified,
  DeliveryDining,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { toggleFavorite } from '../../../redux/slices/customerSlice';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant, index = 0 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.customer);
  
  const isFavorite = favorites.includes(restaurant.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(restaurant.id));
  };

  const handleCardClick = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
    <motion.div
      className="restaurant-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="restaurant-card-image">
        <img src={restaurant.image} alt={restaurant.name} />
        
        {/* Overlay Gradient */}
        <div className="image-overlay" />

        {/* Offer Badge */}
        {restaurant.offer && (
          <motion.div 
            className="offer-badge"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <LocalOffer />
            <span>{restaurant.offer}</span>
          </motion.div>
        )}

        {/* Pro Badge */}
        {restaurant.isPro && (
          <div className="pro-badge">
            <Verified />
            <span>PRO</span>
          </div>
        )}

        {/* Favorite Button */}
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <IconButton 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </motion.div>

        {/* Delivery Time */}
        <div className="delivery-time-badge">
          <AccessTime />
          <span>{restaurant.deliveryTime} min</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="restaurant-card-content">
        {/* Header */}
        <div className="restaurant-card-header">
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <div className="restaurant-rating">
            <Star />
            <span>{restaurant.rating}</span>
          </div>
        </div>

        {/* Cuisines */}
        <p className="restaurant-cuisines">
          {restaurant.cuisines.join(' • ')}
        </p>

        {/* Tags */}
        {restaurant.tags && restaurant.tags.length > 0 && (
          <div className="restaurant-tags">
            {restaurant.tags.map((tag, idx) => (
              <span key={idx} className="tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="restaurant-card-footer">
          <div className="footer-item">
            <LocationOn />
            <span>{restaurant.distance}</span>
          </div>
          <div className="footer-divider" />
          <div className="footer-item">
            <span>₹{restaurant.priceForTwo} for two</span>
          </div>
          {restaurant.freeDelivery && (
            <>
              <div className="footer-divider" />
              <div className="footer-item free-delivery">
                <DeliveryDining />
                <span>Free</span>
              </div>
            </>
          )}
        </div>

        {/* Status */}
        {!restaurant.isOpen && (
          <div className="closed-overlay">
            <span>Currently Closed</span>
            <p>Opens at {restaurant.openTime}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Horizontal Variant
export const RestaurantCardHorizontal = ({ restaurant, index = 0 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.customer);
  
  const isFavorite = favorites.includes(restaurant.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(restaurant.id));
  };

  return (
    <motion.div
      className="restaurant-card-horizontal"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ x: 5 }}
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
    >
      {/* Image */}
      <div className="horizontal-image">
        <img src={restaurant.image} alt={restaurant.name} />
        {restaurant.offer && (
          <div className="mini-offer-badge">{restaurant.offer}</div>
        )}
      </div>

      {/* Content */}
      <div className="horizontal-content">
        <div className="horizontal-header">
          <h4>{restaurant.name}</h4>
          <div className="rating-badge">
            <Star />
            <span>{restaurant.rating}</span>
          </div>
        </div>
        <p className="horizontal-cuisines">
          {restaurant.cuisines.slice(0, 2).join(' • ')}
        </p>
        <div className="horizontal-meta">
          <span><AccessTime /> {restaurant.deliveryTime} min</span>
          <span><LocationOn /> {restaurant.distance}</span>
        </div>
      </div>

      {/* Favorite */}
      <IconButton 
        className={`horizontal-favorite ${isFavorite ? 'active' : ''}`}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </motion.div>
  );
};

// Mini Card Variant
export const RestaurantCardMini = ({ restaurant, onClick }) => {
  return (
    <motion.div
      className="restaurant-card-mini"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <img src={restaurant.image} alt={restaurant.name} />
      <div className="mini-content">
        <h5>{restaurant.name}</h5>
        <div className="mini-rating">
          <Star />
          <span>{restaurant.rating}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;