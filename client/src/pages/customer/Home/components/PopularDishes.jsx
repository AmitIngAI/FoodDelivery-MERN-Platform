import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Chip } from '@mui/material';
import { 
  Star, 
  FiberManualRecord, 
  Add,
  Favorite,
  FavoriteBorder,
  TrendingUp,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../redux/slices/customerSlice';
import { toast } from 'react-toastify';
import './PopularDishes.css';

const PopularDishes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { id: 'all', label: 'All', icon: '🍽️' },
    { id: 'veg', label: 'Vegetarian', icon: '🥗' },
    { id: 'non-veg', label: 'Non-Veg', icon: '🍗' },
    { id: 'trending', label: 'Trending', icon: '🔥' },
  ];

  const dishes = [
    {
      id: 1,
      name: 'Margherita Pizza',
      restaurant: 'Pizza Paradise',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600',
      price: 299,
      originalPrice: 399,
      rating: 4.7,
      reviews: 1250,
      isVeg: true,
      isBestseller: true,
      isTrending: true,
      description: 'Classic pizza with fresh tomatoes, mozzarella, and basil',
      category: 'veg',
    },
    {
      id: 2,
      name: 'Chicken Biryani',
      restaurant: 'Royal Biryani House',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600',
      price: 349,
      originalPrice: 449,
      rating: 4.8,
      reviews: 2100,
      isVeg: false,
      isBestseller: true,
      isTrending: true,
      description: 'Aromatic basmati rice with tender chicken pieces',
      category: 'non-veg',
    },
    {
      id: 3,
      name: 'Veggie Supreme Burger',
      restaurant: 'The Burger Factory',
      image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600',
      price: 199,
      originalPrice: 249,
      rating: 4.5,
      reviews: 890,
      isVeg: true,
      isBestseller: false,
      isTrending: true,
      description: 'Juicy veggie patty with fresh lettuce and special sauce',
      category: 'veg',
    },
    {
      id: 4,
      name: 'Butter Chicken',
      restaurant: 'Punjabi Tadka',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600',
      price: 299,
      originalPrice: 349,
      rating: 4.9,
      reviews: 1800,
      isVeg: false,
      isBestseller: true,
      isTrending: false,
      description: 'Creamy tomato-based curry with tender chicken',
      category: 'non-veg',
    },
    {
      id: 5,
      name: 'Paneer Tikka',
      restaurant: 'Spice Garden',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600',
      price: 249,
      originalPrice: 299,
      rating: 4.6,
      reviews: 920,
      isVeg: true,
      isBestseller: true,
      isTrending: true,
      description: 'Grilled cottage cheese with aromatic spices',
      category: 'veg',
    },
    {
      id: 6,
      name: 'Chocolate Brownie',
      restaurant: 'Dessert Heaven',
      image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600',
      price: 149,
      originalPrice: 199,
      rating: 4.7,
      reviews: 1100,
      isVeg: true,
      isBestseller: false,
      isTrending: true,
      description: 'Rich chocolate brownie with vanilla ice cream',
      category: 'veg',
    },
    {
      id: 7,
      name: 'Grilled Chicken',
      restaurant: 'Grill Masters',
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600',
      price: 399,
      originalPrice: 499,
      rating: 4.8,
      reviews: 1560,
      isVeg: false,
      isBestseller: true,
      isTrending: true,
      description: 'Perfectly grilled chicken with herbs and spices',
      category: 'non-veg',
    },
    {
      id: 8,
      name: 'Caesar Salad',
      restaurant: 'Green Leaf',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600',
      price: 199,
      originalPrice: 249,
      rating: 4.4,
      reviews: 680,
      isVeg: true,
      isBestseller: false,
      isTrending: false,
      description: 'Fresh romaine lettuce with parmesan and croutons',
      category: 'veg',
    },
  ];

  const filteredDishes = activeCategory === 'all' 
    ? dishes 
    : activeCategory === 'trending'
    ? dishes.filter(d => d.isTrending)
    : dishes.filter(d => d.category === activeCategory);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const handleAddToCart = (dish, e) => {
    e.stopPropagation();
    dispatch(addToCart({ 
      item: dish, 
      restaurant: { 
        id: dish.id, 
        name: dish.restaurant 
      } 
    }));
    toast.success('Added to cart! 🛒');
  };

  const handleDishClick = (dish) => {
    navigate(`/restaurant/${dish.id}`);
  };

  return (
    <section className="popular-dishes-section section">
      {/* Floating Food Elements */}
      <div className="dishes-float-bg">
        <motion.div 
          className="float-element f1"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        >
          🍕
        </motion.div>
        <motion.div 
          className="float-element f2"
          animate={{ y: [0, -25, 0], rotate: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 6, delay: 1 }}
        >
          🍔
        </motion.div>
        <motion.div 
          className="float-element f3"
          animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 7, delay: 2 }}
        >
          🍜
        </motion.div>
      </div>

      <Container>
        {/* Section Header */}
        <div className="section-header" data-aos="fade-up">
          <span className="section-badge">
            <span className="badge-icon">⭐</span>
            Most Loved
          </span>
          <h2 className="section-title">
            Popular <span>Dishes</span>
          </h2>
          <p className="section-subtitle">
            Discover the most ordered and loved dishes from top restaurants
          </p>
        </div>

        {/* Category Filter */}
        <motion.div 
          className="dishes-filter"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="filter-btn-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Dishes Grid */}
        <Grid container spacing={3}>
          <AnimatePresence mode="wait">
            {filteredDishes.map((dish, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={dish.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <div 
                    className="dish-card"
                    onClick={() => handleDishClick(dish)}
                  >
                    {/* Image Container */}
                    <div className="dish-image-wrapper">
                      <motion.img 
                        src={dish.image} 
                        alt={dish.name}
                        className="dish-image"
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Overlay */}
                      <div className="dish-overlay"></div>

                      {/* Badges */}
                      <div className="dish-badges">
                        {dish.isBestseller && (
                          <Chip 
                            icon={<Star />}
                            label="Bestseller"
                            className="bestseller-chip"
                            size="small"
                          />
                        )}
                        {dish.isTrending && (
                          <Chip 
                            icon={<TrendingUp />}
                            label="Trending"
                            className="trending-chip"
                            size="small"
                          />
                        )}
                      </div>

                      {/* Veg/Non-Veg Indicator */}
                      <div className={`veg-indicator ${dish.isVeg ? 'veg' : 'non-veg'}`}>
                        <FiberManualRecord />
                      </div>

                      {/* Favorite */}
                      <motion.button
                        className="dish-fav-btn"
                        onClick={(e) => toggleFavorite(dish.id, e)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {favorites.includes(dish.id) ? (
                          <Favorite className="filled" />
                        ) : (
                          <FavoriteBorder />
                        )}
                      </motion.button>

                      {/* Quick Add Button */}
                      <motion.button
                        className="quick-add-btn"
                        onClick={(e) => handleAddToCart(dish, e)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Add />
                      </motion.button>
                    </div>

                    {/* Content */}
                    <div className="dish-content">
                      <h3 className="dish-name">{dish.name}</h3>
                      <p className="dish-restaurant">{dish.restaurant}</p>
                      
                      {/* Rating */}
                      <div className="dish-rating">
                        <Star className="star-icon" />
                        <span className="rating-value">{dish.rating}</span>
                        <span className="rating-reviews">({dish.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="dish-price-row">
                        <div className="dish-price">
                          <span className="current-price">₹{dish.price}</span>
                          {dish.originalPrice && (
                            <span className="original-price">₹{dish.originalPrice}</span>
                          )}
                        </div>
                        {dish.originalPrice && (
                          <span className="discount-badge">
                            {Math.round(((dish.originalPrice - dish.price) / dish.originalPrice) * 100)}% OFF
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hover Glow */}
                    <div className="dish-glow"></div>
                  </div>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </Container>
    </section>
  );
};

export default PopularDishes;