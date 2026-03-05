import React from 'react';
import { Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import './Stats.css';

const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    {
      id: 1,
      icon: '🍔',
      value: 50000,
      suffix: '+',
      label: 'Orders Delivered',
      color: '#FF6B6B',
      description: 'Successfully delivered with love',
    },
    {
      id: 2,
      icon: '🏪',
      value: 1000,
      suffix: '+',
      label: 'Restaurant Partners',
      color: '#4ECDC4',
      description: 'Top restaurants on our platform',
    },
    {
      id: 3,
      icon: '⭐',
      value: 4.8,
      decimals: 1,
      suffix: '/5',
      label: 'Customer Rating',
      color: '#FFE66D',
      description: 'Based on 100K+ reviews',
    },
    {
      id: 4,
      icon: '🚀',
      value: 98,
      suffix: '%',
      label: 'On-Time Delivery',
      color: '#A855F7',
      description: 'We value your time',
    },
  ];

  return (
    <section className="stats-section section" ref={ref}>
      {/* Animated Background */}
      <div className="stats-bg">
        <div className="stats-wave wave-1"></div>
        <div className="stats-wave wave-2"></div>
        <div className="stats-wave wave-3"></div>
      </div>

      <Container>
        {/* Section Header */}
        <div className="section-header" data-aos="fade-up">
          <span className="section-badge">
            <span className="badge-icon">📊</span>
            Our Achievements
          </span>
          <h2 className="section-title">
            Trusted by <span>Millions</span>
          </h2>
          <p className="section-subtitle">
            Join thousands of happy customers who trust us daily
          </p>
        </div>

        {/* Stats Grid */}
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={stat.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div 
                  className="stat-card"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  {/* Background Glow */}
                  <div 
                    className="stat-glow"
                    style={{ background: `${stat.color}20` }}
                  ></div>

                  {/* Icon */}
                  <motion.div 
                    className="stat-icon"
                    style={{ background: `${stat.color}15` }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <span style={{ fontSize: '3rem' }}>{stat.icon}</span>
                  </motion.div>

                  {/* Value */}
                  <div className="stat-value" style={{ color: stat.color }}>
                    {inView && (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        decimals={stat.decimals || 0}
                        separator=","
                      />
                    )}
                    <span className="stat-suffix">{stat.suffix}</span>
                  </div>

                  {/* Label */}
                  <h3 className="stat-label">{stat.label}</h3>
                  <p className="stat-description">{stat.description}</p>

                  {/* Decorative Circle */}
                  <div 
                    className="stat-circle"
                    style={{ borderColor: stat.color }}
                  ></div>
                </div>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Bottom Text */}
        <motion.div 
          className="stats-bottom-text"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <h3>🎉 Growing Every Day!</h3>
          <p>Join our community and experience the best food delivery service</p>
        </motion.div>
      </Container>
    </section>
  );
};

export default Stats;