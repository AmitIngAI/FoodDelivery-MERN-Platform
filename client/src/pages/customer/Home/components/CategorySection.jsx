import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import './CategorySection.css';

const CategorySection = () => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  const categories = [
    {
      id: 1,
      name: 'Pizza',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
      count: '250+ Options',
      color: '#FF6B6B',
      emoji: '🍕',
    },
    {
      id: 2,
      name: 'Burgers',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      count: '180+ Options',
      color: '#F7931E',
      emoji: '🍔',
    },
    {
      id: 3,
      name: 'Biryani',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
      count: '120+ Options',
      color: '#4ECDC4',
      emoji: '🍚',
    },
    {
      id: 4,
      name: 'Chinese',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400',
      count: '200+ Options',
      color: '#FF6B6B',
      emoji: '🥡',
    },
    {
      id: 5,
      name: 'North Indian',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
      count: '350+ Options',
      color: '#FFE66D',
      emoji: '🍛',
    },
    {
      id: 6,
      name: 'South Indian',
      image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
      count: '150+ Options',
      color: '#06D6A0',
      emoji: '🥘',
    },
    {
      id: 7,
      name: 'Desserts',
      image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400',
      count: '300+ Options',
      color: '#EF476F',
      emoji: '🍰',
    },
    {
      id: 8,
      name: 'Healthy',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      count: '100+ Options',
      color: '#4ECDC4',
      emoji: '🥗',
    },
    {
      id: 9,
      name: 'Sushi',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
      count: '80+ Options',
      color: '#118AB2',
      emoji: '🍣',
    },
    {
      id: 10,
      name: 'Street Food',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
      count: '200+ Options',
      color: '#FF6B6B',
      emoji: '🌮',
    },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/restaurants?category=${category.name.toLowerCase()}`);
  };

  return (
    <section className="category-section section">
      {/* Background Decorations */}
      <div className="category-bg-decoration">
        <div className="decoration-blob blob-1"></div>
        <div className="decoration-blob blob-2"></div>
      </div>

      <Container>
        {/* Section Header */}
        <div className="section-header" data-aos="fade-up">
          <span className="section-badge">
            <span className="badge-icon">🍽️</span>
            Explore Categories
          </span>
          <h2 className="section-title">
            What's on your <span>mind?</span>
          </h2>
          <p className="section-subtitle">
            Choose from our wide variety of cuisines and discover new favorites
          </p>
        </div>

        {/* Category Slider */}
        <div className="category-slider-wrapper" data-aos="fade-up" data-aos-delay="200">
          {/* Navigation Buttons */}
          <IconButton 
            className="slider-nav prev"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowBackIos />
          </IconButton>
          
          <IconButton 
            className="slider-nav next"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowForwardIos />
          </IconButton>

          <Swiper
            modules={[Navigation, FreeMode]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={24}
            slidesPerView="auto"
            freeMode={true}
            className="category-swiper"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={category.id} className="category-slide">
                <motion.div
                  className="category-card"
                  onClick={() => handleCategoryClick(category)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  {/* Card Background Glow */}
                  <div 
                    className="card-glow"
                    style={{ background: `${category.color}30` }}
                  />
                  
                  {/* Image Container */}
                  <div className="category-image-container">
                    <motion.div 
                      className="category-image"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img src={category.image} alt={category.name} />
                    </motion.div>
                    <span className="category-emoji">{category.emoji}</span>
                  </div>

                  {/* Content */}
                  <div className="category-content">
                    <h3 className="category-name">{category.name}</h3>
                    <p className="category-count">{category.count}</p>
                  </div>

                  {/* Hover Indicator */}
                  <div 
                    className="category-indicator"
                    style={{ background: category.color }}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View All Button */}
        <motion.div 
          className="view-all-wrapper"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <motion.button
            className="view-all-btn"
            onClick={() => navigate('/restaurants')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Categories
            <ArrowForwardIos />
          </motion.button>
        </motion.div>
      </Container>
    </section>
  );
};

export default CategorySection;