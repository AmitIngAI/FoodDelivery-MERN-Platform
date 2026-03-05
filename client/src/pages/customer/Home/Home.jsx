import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import HowItWorks from './components/HowItWorks';
import FeaturedRestaurants from './components/FeaturedRestaurants';
import PopularDishes from './components/PopularDishes';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import AppDownload from './components/AppDownload';

import './Home.css';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <motion.div 
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroSection />
      <CategorySection />
      <FeaturedRestaurants />
      <HowItWorks />
      <PopularDishes />
      <Stats />
      <Testimonials />
      <AppDownload />
    </motion.div>
  );
};

export default Home;