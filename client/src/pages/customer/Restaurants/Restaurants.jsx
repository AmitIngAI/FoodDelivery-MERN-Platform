import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Slider,
  Switch,
  FormControlLabel,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Search,
  FilterList,
  Close,
  TuneRounded,
  Star,
  AccessTime,
  LocalOffer,
  Restaurant,
  FiberManualRecord,
  Favorite,
  FavoriteBorder,
  Verified,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { setFilters, setSearchQuery, toggleFavorite } from '../../../redux/slices/customerSlice';
import { restaurants as mockRestaurants, categories } from '../../../utils/mockData';
import './Restaurants.css';

const Restaurants = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { filters, searchQuery, favorites } = useSelector(state => state.customer);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [restaurants, setRestaurants] = useState(mockRestaurants);

  // Get search params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const search = params.get('search');
    
    if (category) {
      dispatch(setFilters({ cuisine: category }));
    }
    if (search) {
      dispatch(setSearchQuery(search));
    }
  }, [location.search]);

  // Filter restaurants
  useEffect(() => {
    let filtered = [...mockRestaurants];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisines.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Cuisine filter
    if (filters.cuisine && filters.cuisine !== 'All') {
      filtered = filtered.filter(r => 
        r.cuisines.some(c => c.toLowerCase() === filters.cuisine.toLowerCase())
      );
    }

    // Veg only filter
    if (filters.vegOnly) {
      filtered = filtered.filter(r => r.isVeg);
    }

    // Free delivery filter
    if (filters.freeDelivery) {
      filtered = filtered.filter(r => r.freeDelivery);
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(r => r.rating >= filters.rating);
    }

    // Sort
    switch (filters.sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'deliveryTime':
        filtered.sort((a, b) => 
          parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
        );
        break;
      case 'costLowHigh':
        filtered.sort((a, b) => a.priceForTwo - b.priceForTwo);
        break;
      case 'costHighLow':
        filtered.sort((a, b) => b.priceForTwo - a.priceForTwo);
        break;
      default:
        break;
    }

    setRestaurants(filtered);
  }, [searchQuery, filters]);

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleCategoryClick = (category) => {
    dispatch(setFilters({ cuisine: category }));
  };

  const handleFavoriteClick = (e, id) => {
    e.stopPropagation();
    dispatch(toggleFavorite(id));
  };

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  const clearFilters = () => {
    dispatch(setFilters({
      cuisine: 'All',
      sortBy: 'relevance',
      priceRange: [0, 1000],
      rating: 0,
      vegOnly: false,
      freeDelivery: false,
    }));
    dispatch(setSearchQuery(''));
  };

  const FilterPanel = () => (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>
          <TuneRounded />
          Filters
        </h3>
        {isMobile && (
          <IconButton onClick={() => setFilterDrawerOpen(false)}>
            <Close />
          </IconButton>
        )}
      </div>

      {/* Sort By */}
      <div className="filter-group">
        <label>Sort By</label>
        <FormControl fullWidth size="small">
          <Select
            value={filters.sortBy}
            onChange={(e) => dispatch(setFilters({ sortBy: e.target.value }))}
          >
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="rating">Rating: High to Low</MenuItem>
            <MenuItem value="deliveryTime">Delivery Time</MenuItem>
            <MenuItem value="costLowHigh">Cost: Low to High</MenuItem>
            <MenuItem value="costHighLow">Cost: High to Low</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Rating Filter */}
      <div className="filter-group">
        <label>Minimum Rating</label>
        <div className="rating-filter">
          {[4.5, 4.0, 3.5, 0].map((rating) => (
            <Chip
              key={rating}
              label={rating === 0 ? 'All' : `${rating}+ ⭐`}
              onClick={() => dispatch(setFilters({ rating }))}
              className={filters.rating === rating ? 'active' : ''}
            />
          ))}
        </div>
      </div>

      {/* Toggle Filters */}
      <div className="filter-group">
        <FormControlLabel
          control={
            <Switch
              checked={filters.vegOnly}
              onChange={(e) => dispatch(setFilters({ vegOnly: e.target.checked }))}
              color="success"
            />
          }
          label="Pure Veg Only"
        />
        <FormControlLabel
          control={
            <Switch
              checked={filters.freeDelivery}
              onChange={(e) => dispatch(setFilters({ freeDelivery: e.target.checked }))}
              color="primary"
            />
          }
          label="Free Delivery"
        />
      </div>

      {/* Clear Filters */}
      <motion.button
        className="clear-filters-btn"
        onClick={clearFilters}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Clear All Filters
      </motion.button>
    </div>
  );

  return (
    <div className="restaurants-page">
      {/* Hero Section */}
      <div className="restaurants-hero">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-content"
          >
            <h1>Explore <span>Restaurants</span></h1>
            <p>Discover the best food from {restaurants.length}+ restaurants</p>
            
            {/* Search Bar */}
            <div className="search-container">
              <TextField
                fullWidth
                placeholder="Search for restaurants or cuisines..."
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                className="search-input"
              />
              {isMobile && (
                <IconButton 
                  className="filter-toggle"
                  onClick={() => setFilterDrawerOpen(true)}
                >
                  <FilterList />
                </IconButton>
              )}
            </div>
          </motion.div>
        </Container>
      </div>

      <Container className="restaurants-container">
        {/* Categories */}
        <div className="categories-bar">
          <div className="categories-scroll">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                className={`category-btn ${filters.cuisine === cat.name ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.name)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <Grid container spacing={3}>
          {/* Filter Sidebar - Desktop */}
          {!isMobile && (
            <Grid item md={3}>
              <div className="filter-sidebar">
                <FilterPanel />
              </div>
            </Grid>
          )}

          {/* Restaurant Grid */}
          <Grid item xs={12} md={!isMobile ? 9 : 12}>
            <div className="results-header">
              <h2>{restaurants.length} Restaurants Found</h2>
              {(searchQuery || filters.cuisine !== 'All') && (
                <div className="active-filters">
                  {searchQuery && (
                    <Chip 
                      label={`"${searchQuery}"`}
                      onDelete={() => dispatch(setSearchQuery(''))}
                      size="small"
                    />
                  )}
                  {filters.cuisine !== 'All' && (
                    <Chip 
                      label={filters.cuisine}
                      onDelete={() => dispatch(setFilters({ cuisine: 'All' }))}
                      size="small"
                    />
                  )}
                </div>
              )}
            </div>

            <Grid container spacing={3}>
              <AnimatePresence>
                {restaurants.map((restaurant, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={restaurant.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      layout
                    >
                      <div 
                        className="restaurant-card"
                        onClick={() => handleRestaurantClick(restaurant.id)}
                      >
                        {/* Image */}
                        <div className="card-image">
                          <motion.img 
                            src={restaurant.image} 
                            alt={restaurant.name}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                          />
                          <div className="image-overlay"></div>

                          {/* Badges */}
                          <div className="card-badges">
                            {restaurant.offer && (
                              <span className="offer-badge">
                                <LocalOffer /> {restaurant.offer}
                              </span>
                            )}
                            {restaurant.isFeatured && (
                              <span className="featured-badge">Featured</span>
                            )}
                          </div>

                          {/* Favorite */}
                          <motion.button
                            className="fav-btn"
                            onClick={(e) => handleFavoriteClick(e, restaurant.id)}
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
                          <div className="delivery-badge">
                            <AccessTime />
                            <span>{restaurant.deliveryTime} min</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="card-content">
                          <div className="card-header">
                            <div className="name-row">
                              <h3>{restaurant.name}</h3>
                              {restaurant.isPro && <Verified className="pro-icon" />}
                            </div>
                            <div className="rating">
                              <Star />
                              <span>{restaurant.rating}</span>
                            </div>
                          </div>

                          <p className="cuisines">
                            {restaurant.isVeg && (
                              <FiberManualRecord className="veg-icon" />
                            )}
                            {restaurant.cuisines.join(' • ')}
                          </p>

                          <div className="card-footer">
                            <span className="price">₹{restaurant.priceForTwo} for two</span>
                            <span className="distance">📍 {restaurant.distance}</span>
                          </div>

                          {/* Tags */}
                          {restaurant.tags && (
                            <div className="card-tags">
                              {restaurant.tags.map((tag, i) => (
                                <span key={i} className="tag">{tag}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>

            {/* No Results */}
            {restaurants.length === 0 && (
              <motion.div 
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png" alt="No results" />
                <h3>No Restaurants Found</h3>
                <p>Try adjusting your search or filters</p>
                <motion.button
                  className="btn-primary"
                  onClick={clearFilters}
                  whileHover={{ scale: 1.05 }}
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        className="filter-drawer"
      >
        <FilterPanel />
      </Drawer>
    </div>
  );
};

export default Restaurants;