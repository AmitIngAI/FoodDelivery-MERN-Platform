import React, { useState, useRef } from 'react';
import { Container } from '@mui/material';
import { 
  Star, 
  FormatQuote, 
  ArrowBackIos, 
  ArrowForwardIos,
  Verified,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './Testimonials.css';

const Testimonials = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Food Blogger',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      rating: 5,
      review: "Absolutely love FoodDelivery Pro! The variety of restaurants is amazing, and the delivery is always on time. The app is so easy to use, and I've discovered so many new favorite dishes. Highly recommended! 🍕❤️",
      date: '2 days ago',
      orderCount: 156,
      verified: true,
    },
    {
      id: 2,
      name: 'Rahul Verma',
      role: 'Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      rating: 5,
      review: "Best food delivery app I've ever used! The real-time tracking feature is fantastic, and the customer support is very helpful. I order almost every day during work from home. The discounts are cherry on top! 🎉",
      date: '1 week ago',
      orderCount: 234,
      verified: true,
    },
    {
      id: 3,
      name: 'Ananya Patel',
      role: 'Marketing Manager',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      rating: 5,
      review: "The quality of food and packaging is consistently excellent! I've tried so many different cuisines through this app. The offers and discounts make it even better. My go-to app for food delivery! 🌟",
      date: '3 days ago',
      orderCount: 89,
      verified: true,
    },
    {
      id: 4,
      name: 'Vikram Singh',
      role: 'Business Owner',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      rating: 5,
      review: "As someone who orders frequently for office meetings, FoodDelivery Pro has been a lifesaver! Bulk orders are handled smoothly, and the corporate account feature is very convenient. Great service! 👔",
      date: '5 days ago',
      orderCount: 312,
      verified: true,
    },
    {
      id: 5,
      name: 'Sneha Reddy',
      role: 'Fitness Trainer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
      rating: 5,
      review: "Love the healthy food options available! The calorie information and dietary filters help me stick to my nutrition goals. Finally, a food delivery app that cares about health! 💪🥗",
      date: '1 day ago',
      orderCount: 67,
      verified: true,
    },
    {
      id: 6,
      name: 'Arjun Mehta',
      role: 'College Student',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      rating: 5,
      review: "Perfect for students! The prices are reasonable, and the student discounts are amazing. Late-night cravings are always satisfied. Fast delivery even at midnight! 🌙🍔",
      date: '4 days ago',
      orderCount: 145,
      verified: true,
    },
  ];

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <section className="testimonials-section section">
      {/* Background Elements */}
      <div className="testimonials-bg">
        <div className="testimonials-shape shape-1"></div>
        <div className="testimonials-shape shape-2"></div>
        <div className="quote-bg-icon left">
          <FormatQuote />
        </div>
        <div className="quote-bg-icon right">
          <FormatQuote />
        </div>
      </div>

      <Container>
        {/* Section Header */}
        <div className="section-header" data-aos="fade-up">
          <span className="section-badge">
            <span className="badge-icon">💬</span>
            Testimonials
          </span>
          <h2 className="section-title">
            What Our <span>Customers Say</span>
          </h2>
          <p className="section-subtitle">
            Real reviews from real food lovers who trust us daily
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="testimonials-slider-wrapper" data-aos="fade-up" data-aos-delay="200">
          {/* Navigation Buttons */}
          <motion.button
            className="testimonial-nav prev"
            onClick={() => swiperRef.current?.slidePrev()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowBackIos />
          </motion.button>

          <motion.button
            className="testimonial-nav next"
            onClick={() => swiperRef.current?.slideNext()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowForwardIos />
          </motion.button>

          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop={true}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id} className="testimonial-slide">
                <motion.div
                  className="testimonial-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Quote Icon */}
                  <div className="quote-icon">
                    <FormatQuote />
                  </div>

                  {/* Rating */}
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={i < testimonial.rating ? 'filled' : ''}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="testimonial-review">{testimonial.review}</p>

                  {/* User Info */}
                  <div className="testimonial-user">
                    <div className="user-avatar-wrapper">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="user-avatar"
                      />
                      {testimonial.verified && (
                        <span className="verified-badge">
                          <Verified />
                        </span>
                      )}
                    </div>
                    <div className="user-info">
                      <h4 className="user-name">{testimonial.name}</h4>
                      <p className="user-role">{testimonial.role}</p>
                      <div className="user-stats">
                        <span className="order-count">🛒 {testimonial.orderCount} orders</span>
                        <span className="review-date">• {testimonial.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="card-decoration d1"></div>
                  <div className="card-decoration d2"></div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Trust Badges */}
        <motion.div
          className="trust-badges"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="trust-badge">
            <span className="badge-value">10M+</span>
            <span className="badge-label">Happy Customers</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-badge">
            <span className="badge-value">4.8⭐</span>
            <span className="badge-label">App Store Rating</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-badge">
            <span className="badge-value">100K+</span>
            <span className="badge-label">5-Star Reviews</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-badge">
            <span className="badge-value">99.9%</span>
            <span className="badge-label">Satisfaction Rate</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Testimonials;