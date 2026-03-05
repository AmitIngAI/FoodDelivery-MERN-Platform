import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Chip } from '@mui/material';
import { 
  Star, 
  AccessTime, 
  FiberManualRecord, 
  Favorite, 
  FavoriteBorder,
  LocalOffer,
  Verified,
  ArrowForward,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import './FeaturedRestaurants.css';

const FeaturedRestaurants = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);

  const filters = [
    { id: 'all', label: 'All', icon: '🍽️' },
    { id: 'trending', label: 'Trending', icon: '🔥' },
    { id: 'rating', label: 'Top Rated', icon: '⭐' },
    { id: 'fast', label: 'Fast Delivery', icon: '⚡' },
    { id: 'offers', label: 'Best Offers', icon: '🎁' },
  ];

  const restaurants = [
    {
      id: 1,
      name: "Pizza Paradise",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
      coverImage: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800",
      cuisines: ["Pizza", "Italian", "Fast Food"],
      rating: 4.5,
      deliveryTime: "25-30",
      priceForTwo: 400,
      distance: "1.5 km",
      offer: "50% OFF up to ₹100",
      isVeg: false,
      isPro: true,
      isFeatured: true,
      category: 'trending',
    },
    {
      id: 2,
      name: "The Burger Factory",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
      coverImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
      cuisines: ["Burgers", "American", "Fast Food"],
      rating: 4.3,
      deliveryTime: "20-25",
      priceForTwo: 350,
      distance: "2.0 km",
      offer: "Buy 1 Get 1 Free",
      isVeg: false,
      isPro: true,
      isFeatured: false,
      category: 'fast',
    },
    {
      id: 3,
      name: "Royal Biryani House",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600",
      coverImage: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800",
      cuisines: ["Biryani", "Mughlai", "North Indian"],
      rating: 4.7,
      deliveryTime: "35-40",
      priceForTwo: 500,
      distance: "3.5 km",
      offer: "20% OFF",
      isVeg: false,
      isPro: false,
      isFeatured: true,
      category: 'rating',
    },
    {
      id: 4,
      name: "Green Leaf Salads",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
      coverImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
      cuisines: ["Healthy", "Salads", "Continental"],
      rating: 4.6,
      deliveryTime: "30-35",
      priceForTwo: 350,
      distance: "2.8 km",
      offer: "Free Delivery",
      isVeg: true,
      isPro: true,
      isFeatured: false,
      category: 'offers',
    },
    {
      id: 5,
      name: "Dragon Wok",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600",
      coverImage: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=800",
      cuisines: ["Chinese", "Thai", "Asian"],
      rating: 4.4,
      deliveryTime: "25-30",
      priceForTwo: 450,
      distance: "1.8 km",
      offer: "₹75 OFF above ₹249",
      isVeg: false,
      isPro: false,
      isFeatured: true,
      category: 'trending',
    },
    {
      id: 6,
      name: "Dessert Heaven",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600",
      coverImage: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
      cuisines: ["Desserts", "Ice Cream", "Bakery"],
      rating: 4.8,
      deliveryTime: "20-25",
      priceForTwo: 300,
      distance: "1.2 km",
      offer: "40% OFF",
      isVeg: true,
      isPro: true,
      isFeatured: true,
      category: 'rating',
    },
  ];

  const filteredRestaurants = activeFilter === 'all' 
    ? restaurants 
    : restaurants.filter(r => r.category === activeFilter);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <section className="restaurants-section section">
      {/* Decorations */}
      <div className="restaurants-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
      </div>

      <Container>
        {/* Section Header */}
        <div className="section-header" data-aos="fade-up">
          <span className="section-badge">
            <span className="badge-icon">🏆</span>
            Featured Restaurants
          </span>
          <h2 className="section-title">
            Explore <span>Top Restaurants</span>
          </h2>
          <p className="section-subtitle">
            Discover handpicked restaurants with the best food and service
          </p>
        </div>

        {/* Filter Tabs */}
        <motion.div 
          className="filter-tabs"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="filter-icon">{filter.icon}</span>
              <span className="filter-label">{filter.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Restaurant Grid */}
        <Grid container spacing={3}>
          <AnimatePresence mode="wait">
            {filteredRestaurants.map((restaurant, index) => (
              <Grid item xs={12} sm={6} lg={4} key={restaurant.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <div 
                    className="restaurant-card"
                    onClick={() => handleRestaurantClick(restaurant.id)}
                  >
                    {/* Image Container */}
                    <div className="restaurant-image-container">
                      <motion.img 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        className="restaurant-image"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="image-overlay"></div>

                      {/* Badges */}
                      <div className="image-badges">
                        {restaurant.offer && (
                          <Chip 
                            icon={<LocalOffer />}
                            label={restaurant.offer}
                            className="offer-badge"
                          />
                        )}
                        {restaurant.isFeatured && (
                          <Chip 
                            label="Featured"
                            className="featured-badge"
                          />
                        )}
                      </div>

                      {/* Favorite Button */}
                      <motion.button
                        className="favorite-btn"
                        onClick={(e) => toggleFavorite(restaurant.id, e)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {favorites.includes(restaurant.id) ? (
                          <Favorite className="filled" />
                        ) : (
                          <FavoriteBorder />
                        )}
                      </motion.button>

                      {/* Delivery Time */}
                      <div className="delivery-time-badge">
                        <AccessTime />
                        <span>{restaurant.deliveryTime} min</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="restaurant-content">
                      {/* Header */}
                      <div className="restaurant-header">
                        <div className="restaurant-name-row">
                          <h3 className="restaurant-name">{restaurant.name}</h3>
                          {restaurant.isPro && (
                            <Verified className="pro-badge" />
                          )}
                        </div>
                        <div className="restaurant-rating">
                          <Star />
                          <span>{restaurant.rating}</span>
                        </div>
                      </div>

                      {/* Cuisines */}
                      <p className="restaurant-cuisines">
                        {restaurant.isVeg && (
                          <FiberManualRecord className="veg-icon" />
                        )}
                        {restaurant.cuisines.join(' • ')}
                      </p>

                      {/* Footer */}
                      <div className="restaurant-footer">
                        <span className="restaurant-price">
                          ₹{restaurant.priceForTwo} for two
                        </span>
                        <span className="restaurant-distance">
                          📍 {restaurant.distance}
                        </span>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="card-hover-effect"></div>
                  </div>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

        {/* View All Button */}
        <motion.div 
          className="view-all-wrapper"
          data-aos="fade-up"
        >
          <motion.button
            className="view-all-btn primary"
            onClick={() => navigate('/restaurants')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Restaurants</span>
            <ArrowForward />
          </motion.button>
        </motion.div>
      </Container>
    </section>
  );
};

export default FeaturedRestaurants;