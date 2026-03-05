import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Tabs,
  Tab,
  Chip,
  Rating,
  IconButton,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  ArrowBack,
  Star,
  AccessTime,
  FiberManualRecord,
  Favorite,
  FavoriteBorder,
  Share,
  LocalOffer,
  Verified,
  Search,
  Add,
  Remove,
  ShoppingCart,
  Close,
  Info,
  ThumbUp,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { addToCart, updateQuantity, toggleFavorite } from '../../../redux/slices/customerSlice';
import { restaurants, menuItems, reviews } from '../../../utils/mockData';
import { toast } from 'react-toastify';
import './RestaurantDetails.css';

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const { cart, favorites } = useSelector(state => state.customer);
  
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [customizeModal, setCustomizeModal] = useState({ open: false, item: null });
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    // Get restaurant data
    const foundRestaurant = restaurants.find(r => r.id === parseInt(id));
    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
      
      // Get menu items (in real app, fetch from API)
      const restaurantMenu = menuItems.filter(item => item.restaurantId === parseInt(id));
      // For demo, use all menu items
      setMenu(menuItems);
      
      // Initialize expanded categories
      const categories = [...new Set(menuItems.map(item => item.category))];
      const expanded = {};
      categories.forEach(cat => expanded[cat] = true);
      setExpandedCategories(expanded);
    }
  }, [id]);

  if (!restaurant) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
  }

  // Group menu by category
  const groupedMenu = menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = ['All', ...Object.keys(groupedMenu)];

  // Filter menu items
  const filterMenu = (items) => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = !vegOnly || item.isVeg;
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesVeg && matchesCategory;
    });
  };

  const getItemQuantity = (itemId) => {
    const cartItem = cart.items.find(i => i.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item) => {
    if (item.customizations && item.customizations.length > 0) {
      setCustomizeModal({ open: true, item });
    } else {
      dispatch(addToCart({ item, restaurant }));
      toast.success('Added to cart! 🛒');
    }
  };

  const handleQuantityChange = (itemId, change) => {
    const currentQty = getItemQuantity(itemId);
    const newQty = currentQty + change;
    
    if (newQty <= 0) {
      dispatch(updateQuantity({ id: itemId, quantity: 0 }));
    } else {
      if (currentQty === 0) {
        const item = menu.find(i => i.id === itemId);
        dispatch(addToCart({ item, restaurant }));
      } else {
        dispatch(updateQuantity({ id: itemId, quantity: newQty }));
      }
    }
  };

  const handleCustomizeAdd = (item, customizations) => {
    const customizedItem = {
      ...item,
      selectedCustomizations: customizations,
      // Calculate new price with customizations
      price: item.price + customizations.reduce((sum, c) => sum + c.price, 0),
    };
    dispatch(addToCart({ item: customizedItem, restaurant }));
    setCustomizeModal({ open: false, item: null });
    toast.success('Added to cart with customizations! 🛒');
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const isFavorite = favorites.includes(restaurant.id);

  return (
    <div className="restaurant-details-page">
      {/* Hero Banner */}
      <div className="restaurant-hero">
        <img src={restaurant.coverImage || restaurant.image} alt={restaurant.name} className="hero-image" />
        <div className="hero-overlay"></div>
        
        {/* Back Button */}
        <motion.button
          className="back-btn"
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowBack />
        </motion.button>

        {/* Action Buttons */}
        <div className="hero-actions">
          <motion.button
            className="action-btn"
            onClick={() => dispatch(toggleFavorite(restaurant.id))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isFavorite ? <Favorite className="filled" /> : <FavoriteBorder />}
          </motion.button>
          <motion.button
            className="action-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share />
          </motion.button>
        </div>
      </div>

      <Container className="restaurant-container">
        {/* Restaurant Info Card */}
        <motion.div 
          className="restaurant-info-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="info-main">
            <div className="info-header">
              <div className="name-row">
                <h1>{restaurant.name}</h1>
                {restaurant.isPro && <Verified className="pro-badge" />}
              </div>
              
              <div className="restaurant-meta">
                <span className="cuisines">{restaurant.cuisines.join(', ')}</span>
                <span className="address">📍 {restaurant.address}</span>
              </div>

              <div className="restaurant-stats">
                <div className="stat">
                  <div className="stat-value">
                    <Star className="star-icon" />
                    <span>{restaurant.rating}</span>
                  </div>
                  <span className="stat-label">{restaurant.totalRatings}+ ratings</span>
                </div>

                <div className="stat-divider"></div>

                <div className="stat">
                  <div className="stat-value">
                    <AccessTime />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <span className="stat-label">min delivery</span>
                </div>

                <div className="stat-divider"></div>

                <div className="stat">
                  <div className="stat-value">
                    <span>₹{restaurant.priceForTwo}</span>
                  </div>
                  <span className="stat-label">for two</span>
                </div>
              </div>

              {/* Offers */}
              {restaurant.offer && (
                <div className="offers-section">
                  <h4>
                    <LocalOffer />
                    Available Offers
                  </h4>
                  <div className="offers-list">
                    <div className="offer-item">
                      <span className="offer-code">OFFER50</span>
                      <span className="offer-text">{restaurant.offer}</span>
                    </div>
                    <div className="offer-item">
                      <span className="offer-code">WELCOME</span>
                      <span className="offer-text">20% off on first order</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="info-image">
              <img src={restaurant.image} alt={restaurant.name} />
              <div className={`status-badge ${restaurant.isOpen ? 'open' : 'closed'}`}>
                {restaurant.isOpen ? '🟢 Open Now' : '🔴 Closed'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="tabs-section">
          <Tabs
            value={activeTab}
            onChange={(e, val) => setActiveTab(val)}
            className="restaurant-tabs"
          >
            <Tab label="Menu" />
            <Tab label="Reviews" />
            <Tab label="Info" />
          </Tabs>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Menu Tab */}
          {activeTab === 0 && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="menu-section"
              ref={menuRef}
            >
              {/* Menu Controls */}
              <div className="menu-controls">
                <div className="search-box">
                  <Search />
                  <input
                    type="text"
                    placeholder="Search dishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="filter-controls">
                  <motion.button
                    className={`veg-filter ${vegOnly ? 'active' : ''}`}
                    onClick={() => setVegOnly(!vegOnly)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiberManualRecord className="veg-icon" />
                    Veg Only
                  </motion.button>
                </div>
              </div>

              {/* Categories Scroll */}
              <div className="menu-categories">
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>

              {/* Menu Items by Category */}
              <div className="menu-items">
                {Object.entries(groupedMenu).map(([category, items]) => {
                  const filteredItems = filterMenu(items);
                  if (filteredItems.length === 0) return null;
                  if (activeCategory !== 'All' && activeCategory !== category) return null;

                  return (
                    <div key={category} className="menu-category">
                      <div 
                        className="category-header"
                        onClick={() => toggleCategory(category)}
                      >
                        <h3>{category} ({filteredItems.length})</h3>
                        {expandedCategories[category] ? <ExpandLess /> : <ExpandMore />}
                      </div>

                      <AnimatePresence>
                        {expandedCategories[category] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="category-items"
                          >
                            {filteredItems.map((item, index) => (
                              <motion.div
                                key={item.id}
                                className="menu-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <div className="item-content">
                                  {/* Veg/Non-veg indicator */}
                                  <div className={`type-indicator ${item.isVeg ? 'veg' : 'non-veg'}`}>
                                    <FiberManualRecord />
                                  </div>

                                  <div className="item-details">
                                    <div className="item-header">
                                      <h4>{item.name}</h4>
                                      {item.isBestseller && (
                                        <span className="bestseller-tag">⭐ Bestseller</span>
                                      )}
                                    </div>

                                    <div className="item-price">
                                      <span className="current-price">₹{item.price}</span>
                                      {item.originalPrice && (
                                        <span className="original-price">₹{item.originalPrice}</span>
                                      )}
                                      {item.originalPrice && (
                                        <span className="discount">
                                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                        </span>
                                      )}
                                    </div>

                                    {item.rating && (
                                      <div className="item-rating">
                                        <Star />
                                        <span>{item.rating}</span>
                                        <span className="rating-count">({item.reviews})</span>
                                      </div>
                                    )}

                                    <p className="item-description">{item.description}</p>

                                    {item.customizations && (
                                      <span className="customizable-tag">Customizable</span>
                                    )}
                                  </div>
                                </div>

                                <div className="item-action">
                                  <div className="item-image-wrapper">
                                    <img src={item.image} alt={item.name} />
                                    
                                    {/* Add/Quantity Button */}
                                    <div className="add-btn-wrapper">
                                      {getItemQuantity(item.id) === 0 ? (
                                        <motion.button
                                          className="add-btn"
                                          onClick={() => handleAddToCart(item)}
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                        >
                                          ADD
                                          <span className="add-plus">+</span>
                                        </motion.button>
                                      ) : (
                                        <div className="quantity-btn">
                                          <button onClick={() => handleQuantityChange(item.id, -1)}>
                                            <Remove />
                                          </button>
                                          <span>{getItemQuantity(item.id)}</span>
                                          <button onClick={() => handleQuantityChange(item.id, 1)}>
                                            <Add />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Reviews Tab */}
          {activeTab === 1 && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="reviews-section"
            >
              {/* Rating Summary */}
              <div className="rating-summary">
                <div className="rating-big">
                  <span className="rating-value">{restaurant.rating}</span>
                  <Star className="star-icon" />
                </div>
                <div className="rating-info">
                  <p>{restaurant.totalRatings}+ ratings</p>
                  <Rating value={restaurant.rating} precision={0.5} readOnly />
                </div>
              </div>

              {/* Reviews List */}
              <div className="reviews-list">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    className="review-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="review-header">
                      <img src={review.userAvatar} alt={review.userName} className="reviewer-avatar" />
                      <div className="reviewer-info">
                        <h4>{review.userName}</h4>
                        <div className="review-meta">
                          <Rating value={review.rating} size="small" readOnly />
                          <span className="review-date">{review.date}</span>
                        </div>
                      </div>
                    </div>

                    <p className="review-text">{review.review}</p>

                    {review.images && review.images.length > 0 && (
                      <div className="review-images">
                        {review.images.map((img, i) => (
                          <img key={i} src={img} alt="Review" />
                        ))}
                      </div>
                    )}

                    <div className="review-actions">
                      <button className="helpful-btn">
                        <ThumbUp />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Info Tab */}
          {activeTab === 2 && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="info-section"
            >
              <div className="info-card">
                <h3>
                  <Info />
                  Restaurant Information
                </h3>
                
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Address</span>
                    <span className="info-value">{restaurant.address}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Opening Hours</span>
                    <span className="info-value">{restaurant.openTime} - {restaurant.closeTime}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Cuisines</span>
                    <span className="info-value">{restaurant.cuisines.join(', ')}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Average Cost</span>
                    <span className="info-value">₹{restaurant.priceForTwo} for two people</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Type</span>
                    <span className="info-value">{restaurant.isVeg ? 'Pure Vegetarian' : 'Veg & Non-Veg'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      {/* Floating Cart Button */}
      {cart.totalItems > 0 && cart.restaurant?.id === restaurant.id && (
        <motion.div
          className="floating-cart"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={() => navigate('/cart')}
        >
          <div className="cart-info">
            <span className="cart-items">{cart.totalItems} item{cart.totalItems > 1 ? 's' : ''}</span>
            <span className="cart-total">₹{cart.totalAmount}</span>
          </div>
          <div className="cart-action">
            <span>View Cart</span>
            <ShoppingCart />
          </div>
        </motion.div>
      )}

      {/* Customize Modal */}
      <Dialog
        open={customizeModal.open}
        onClose={() => setCustomizeModal({ open: false, item: null })}
        maxWidth="sm"
        fullWidth
        className="customize-modal"
      >
        {customizeModal.item && (
          <>
            <DialogTitle>
              <div className="modal-header">
                <h3>Customize "{customizeModal.item.name}"</h3>
                <IconButton onClick={() => setCustomizeModal({ open: false, item: null })}>
                  <Close />
                </IconButton>
              </div>
            </DialogTitle>
            <DialogContent>
              <CustomizeContent 
                item={customizeModal.item}
                onAdd={handleCustomizeAdd}
              />
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
};

// Customize Content Component
const CustomizeContent = ({ item, onAdd }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(item.price);

  const handleOptionChange = (customizationTitle, option, isRequired) => {
    setSelectedOptions(prev => {
      if (isRequired) {
        return { ...prev, [customizationTitle]: option };
      } else {
        const current = prev[customizationTitle] || [];
        if (current.find(o => o.name === option.name)) {
          return { ...prev, [customizationTitle]: current.filter(o => o.name !== option.name) };
        } else {
          return { ...prev, [customizationTitle]: [...current, option] };
        }
      }
    });
  };

  useEffect(() => {
    let price = item.price;
    Object.values(selectedOptions).forEach(opt => {
      if (Array.isArray(opt)) {
        opt.forEach(o => price += o.price);
      } else if (opt) {
        price += opt.price;
      }
    });
    setTotalPrice(price);
  }, [selectedOptions, item.price]);

  const handleAdd = () => {
    const customizations = Object.values(selectedOptions).flat().filter(Boolean);
    onAdd(item, customizations);
  };

  return (
    <div className="customize-content">
      {item.customizations.map((customization, idx) => (
        <div key={idx} className="customization-group">
          <div className="customization-header">
            <h4>{customization.title}</h4>
            {customization.required && <span className="required-tag">Required</span>}
          </div>
          
          <div className="customization-options">
            {customization.required ? (
              <RadioGroup
                value={selectedOptions[customization.title]?.name || ''}
                onChange={(e) => {
                  const option = customization.options.find(o => o.name === e.target.value);
                  handleOptionChange(customization.title, option, true);
                }}
              >
                {customization.options.map((option, i) => (
                  <FormControlLabel
                    key={i}
                    value={option.name}
                    control={<Radio />}
                    label={
                      <div className="option-label">
                        <span>{option.name}</span>
                        {option.price > 0 && <span className="option-price">+₹{option.price}</span>}
                      </div>
                    }
                  />
                ))}
              </RadioGroup>
            ) : (
              customization.options.map((option, i) => (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      checked={(selectedOptions[customization.title] || []).some(o => o.name === option.name)}
                      onChange={() => handleOptionChange(customization.title, option, false)}
                    />
                  }
                  label={
                    <div className="option-label">
                      <span>{option.name}</span>
                      {option.price > 0 && <span className="option-price">+₹{option.price}</span>}
                    </div>
                  }
                />
              ))
            )}
          </div>
        </div>
      ))}

      <motion.button
        className="add-to-cart-btn"
        onClick={handleAdd}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Add to Cart - ₹{totalPrice}
      </motion.button>
    </div>
  );
};

export default RestaurantDetails;