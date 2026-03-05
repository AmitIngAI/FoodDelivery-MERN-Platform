import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Favorite,
  FavoriteBorder,
  Search,
  FilterList,
  GridView,
  ViewList,
  SortRounded,
  Restaurant,
} from '@mui/icons-material';
import { InputBase, ToggleButtonGroup, ToggleButton } from '@mui/material';
import RestaurantCard, { RestaurantCardHorizontal } from '../../../components/customer/RestaurantCard';
import { RestaurantCardSkeleton } from '../../../components/common/Loader';
import { restaurants as mockRestaurants } from '../../../utils/mockData';
import './Favorites.css';

const Favorites = () => {
  const { favorites } = useSelector(state => state.customer);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      const favRestaurants = mockRestaurants.filter(r => favorites.includes(r.id));
      setFavoriteRestaurants(favRestaurants);
      setFilteredRestaurants(favRestaurants);
      setLoading(false);
    }, 800);
  }, [favorites]);

  useEffect(() => {
    let filtered = [...favoriteRestaurants];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisines.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'delivery':
        filtered.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
        break;
      default:
        // recent - keep original order
        break;
    }

    setFilteredRestaurants(filtered);
  }, [searchQuery, sortBy, favoriteRestaurants]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="favorites-page">
      {/* Hero Section */}
      <section className="favorites-hero">
        <div className="hero-bg-pattern" />
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hero-icon">
              <Favorite />
            </div>
            <h1>Your Favorites</h1>
            <p>All your favorite restaurants in one place</p>
            <div className="favorites-stats">
              <div className="stat-item">
                <span className="stat-number">{favorites.length}</span>
                <span className="stat-label">Saved Restaurants</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="favorites-controls">
        <div className="container">
          <div className="controls-wrapper">
            {/* Search */}
            <div className="search-box">
              <Search />
              <InputBase
                placeholder="Search your favorites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Actions */}
            <div className="control-actions">
              {/* Sort */}
              <div className="sort-dropdown">
                <SortRounded />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="recent">Recently Added</option>
                  <option value="rating">Top Rated</option>
                  <option value="name">Name A-Z</option>
                  <option value="delivery">Fastest Delivery</option>
                </select>
              </div>

              {/* View Toggle */}
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, val) => val && setViewMode(val)}
                className="view-toggle"
              >
                <ToggleButton value="grid">
                  <GridView />
                </ToggleButton>
                <ToggleButton value="list">
                  <ViewList />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="favorites-content">
        <div className="container">
          {loading ? (
            <div className={`restaurants-grid ${viewMode}`}>
              <RestaurantCardSkeleton count={6} />
            </div>
          ) : filteredRestaurants.length === 0 ? (
            <EmptyFavorites hasSearch={searchQuery.length > 0} />
          ) : (
            <motion.div 
              className={`restaurants-grid ${viewMode}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {filteredRestaurants.map((restaurant, index) => (
                  viewMode === 'grid' ? (
                    <RestaurantCard 
                      key={restaurant.id} 
                      restaurant={restaurant} 
                      index={index}
                    />
                  ) : (
                    <RestaurantCardHorizontal 
                      key={restaurant.id} 
                      restaurant={restaurant} 
                      index={index}
                    />
                  )
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

// Empty State Component
const EmptyFavorites = ({ hasSearch }) => {
  return (
    <motion.div 
      className="empty-favorites"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="empty-content">
        <motion.div 
          className="empty-icon"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {hasSearch ? <Search /> : <FavoriteBorder />}
        </motion.div>
        <h3>{hasSearch ? 'No results found' : 'No favorites yet'}</h3>
        <p>
          {hasSearch 
            ? 'Try a different search term'
            : 'Start adding restaurants to your favorites by tapping the heart icon'
          }
        </p>
        {!hasSearch && (
          <motion.a 
            href="/restaurants" 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Restaurant />
            Explore Restaurants
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

export default Favorites;