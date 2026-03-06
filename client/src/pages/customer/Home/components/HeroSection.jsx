import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, InputBase } from '@mui/material';
import { Search, LocationOn, ArrowForward, Star, AccessTime, LocalOffer } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      title: "Delicious Food,",
      highlight: "Delivered Fast",
      subtitle: "Order from 1000+ restaurants and get it delivered in minutes",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
      color: "#FF6B6B",
    },
    {
      title: "Fresh & Healthy",
      highlight: "Meals Daily",
      subtitle: "Choose from a variety of healthy options prepared fresh",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200",
      color: "#4ECDC4",
    },
    {
      title: "Late Night",
      highlight: "Cravings?",
      subtitle: "We deliver 24/7 to satisfy your midnight hunger",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200",
      color: "#FFE66D",
    },
  ];

  const popularSearches = [
    "Pizza", "Burger", "Biryani", "Chinese", "North Indian", "Desserts"
  ];

  const floatingFoods = [
    { emoji: "🍕", delay: 0, x: "10%", y: "20%" },
    { emoji: "🍔", delay: 0.5, x: "85%", y: "25%" },
    { emoji: "🍜", delay: 1, x: "15%", y: "70%" },
    { emoji: "🍰", delay: 1.5, x: "80%", y: "65%" },
    { emoji: "🌮", delay: 2, x: "5%", y: "45%" },
    { emoji: "🍣", delay: 2.5, x: "90%", y: "45%" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${searchQuery}`);
    }
  };

  return (
    <section className="hero-section">
      {/* Background Slider */}
      <div className="hero-bg-slider">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div 
                className="hero-bg-image"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="hero-overlay" />
      </div>

      {/* Floating Food Emojis */}
      <div className="floating-foods">
        {floatingFoods.map((food, index) => (
          <motion.div
            key={index}
            className="floating-food"
            style={{ left: food.x, top: food.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -20, 0],
            }}
            transition={{
              delay: food.delay,
              y: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }
            }}
          >
            {food.emoji}
          </motion.div>
        ))}
      </div>

      <Container className="hero-container">
        <div className="hero-content">
          {/* Main Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="hero-text"
            >
              <motion.h1 className="hero-title">
                {heroSlides[activeSlide].title}
                <span 
                  className="hero-highlight"
                  style={{ color: heroSlides[activeSlide].color }}
                >
                  {heroSlides[activeSlide].highlight}
                </span>
              </motion.h1>
              <motion.p className="hero-subtitle">
                {heroSlides[activeSlide].subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Search Box */}
          <motion.div 
            className="hero-search"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="search-box">
              <div className="search-location">
                <LocationOn />
                <span>Current Location</span>
              </div>
              <div className="search-divider" />
              <form onSubmit={handleSearch} className="search-input-container">
                <Search className="search-icon" />
                <InputBase
                  placeholder="Search for restaurants, cuisines, or dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  fullWidth
                />
                <motion.button
                  type="submit"
                  className="search-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Search</span>
                  <ArrowForward />
                </motion.button>
              </form>
            </div>

            {/* Popular Searches */}
            <div className="popular-searches">
              <span className="popular-label">Popular:</span>
              <div className="popular-tags">
                {popularSearches.map((tag, index) => (
                  <motion.button
                    key={index}
                    className="popular-tag"
                    onClick={() => setSearchQuery(tag)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="hero-stat">
              <div className="stat-icon">
                <Star />
              </div>
              <div className="stat-content">
                <h4>4.8 Rating</h4>
                <p>From 10M+ Users</p>
              </div>
            </div>
            <div className="hero-stat">
              <div className="stat-icon">
                <AccessTime />
              </div>
              <div className="stat-content">
                <h4>30 Minutes</h4>
                <p>Average Delivery</p>
              </div>
            </div>
            <div className="hero-stat">
              <div className="stat-icon">
                <LocalOffer />
              </div>
              <div className="stat-content">
                <h4>50% OFF</h4>
                <p>On First Order</p>
              </div>
            </div>
          </motion.div>

          {/* Slide Indicators */}
          <div className="slide-indicators">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${activeSlide === index ? 'active' : ''}`}
                style={{ 
                  background: activeSlide === index ? heroSlides[index].color : 'rgba(255,255,255,0.3)' 
                }}
              />
            ))}
          </div>
        </div>
      </Container>

      {/* Wave Decoration */}
      <div className="hero-wave">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" 
            fill="var(--light)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;