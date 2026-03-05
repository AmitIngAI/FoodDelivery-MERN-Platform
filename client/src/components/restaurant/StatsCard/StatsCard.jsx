import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import './StatsCard.css';

const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend = null,
  trendValue = null,
  suffix = '',
  prefix = '',
  color = 'primary',
  variant = 'default',
  onClick = null,
}) => {
  const colorStyles = {
    primary: {
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
      light: 'rgba(255, 107, 107, 0.1)',
      text: '#FF6B6B',
    },
    secondary: {
      gradient: 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
      light: 'rgba(78, 205, 196, 0.1)',
      text: '#4ECDC4',
    },
    success: {
      gradient: 'linear-gradient(135deg, #06D6A0 0%, #00C896 100%)',
      light: 'rgba(6, 214, 160, 0.1)',
      text: '#06D6A0',
    },
    warning: {
      gradient: 'linear-gradient(135deg, #FFC43D 0%, #FFD166 100%)',
      light: 'rgba(255, 196, 61, 0.1)',
      text: '#FFC43D',
    },
    danger: {
      gradient: 'linear-gradient(135deg, #EF476F 0%, #F06B85 100%)',
      light: 'rgba(239, 71, 111, 0.1)',
      text: '#EF476F',
    },
    info: {
      gradient: 'linear-gradient(135deg, #118AB2 0%, #0077A8 100%)',
      light: 'rgba(17, 138, 178, 0.1)',
      text: '#118AB2',
    },
  };

  const currentColor = colorStyles[color] || colorStyles.primary;

  const isPositiveTrend = trend === 'up';

  return (
    <motion.div
      className={`stats-card ${variant} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={onClick ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      {variant === 'gradient' ? (
        <>
          <div
            className="stats-card-gradient-bg"
            style={{ background: currentColor.gradient }}
          />
          <div className="stats-content gradient-content">
            <div className="stats-icon-wrapper gradient-icon">
              {Icon && <Icon />}
            </div>
            <div className="stats-info">
              <p className="stats-title">{title}</p>
              <h3 className="stats-value">
                {prefix}
                {typeof value === 'number' ? value.toLocaleString() : value}
                {suffix}
              </h3>
              {trend && trendValue && (
                <div className={`stats-trend ${isPositiveTrend ? 'positive' : 'negative'}`}>
                  {isPositiveTrend ? <TrendingUp /> : <TrendingDown />}
                  <span>{trendValue}%</span>
                  <span className="trend-label">vs last week</span>
                </div>
              )}
            </div>
          </div>
        </>
      ) : variant === 'outlined' ? (
        <div className="stats-content outlined-content">
          <div
            className="stats-icon-wrapper outlined-icon"
            style={{
              background: currentColor.light,
              color: currentColor.text,
            }}
          >
            {Icon && <Icon />}
          </div>
          <div className="stats-info">
            <p className="stats-title">{title}</p>
            <div className="stats-value-row">
              <h3 className="stats-value" style={{ color: currentColor.text }}>
                {prefix}
                {typeof value === 'number' ? value.toLocaleString() : value}
                {suffix}
              </h3>
              {trend && trendValue && (
                <div className={`stats-trend-badge ${isPositiveTrend ? 'positive' : 'negative'}`}>
                  {isPositiveTrend ? <TrendingUp /> : <TrendingDown />}
                  <span>{trendValue}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="stats-content default-content">
          <div className="stats-header">
            <div
              className="stats-icon-wrapper"
              style={{
                background: currentColor.light,
                color: currentColor.text,
              }}
            >
              {Icon && <Icon />}
            </div>
            {trend && trendValue && (
              <div className={`stats-trend-pill ${isPositiveTrend ? 'positive' : 'negative'}`}>
                {isPositiveTrend ? <TrendingUp /> : <TrendingDown />}
                {trendValue}%
              </div>
            )}
          </div>
          <div className="stats-body">
            <h3 className="stats-value">
              {prefix}
              {typeof value === 'number' ? value.toLocaleString() : value}
              {suffix}
            </h3>
            <p className="stats-title">{title}</p>
          </div>
          <div
            className="stats-bar"
            style={{ background: currentColor.gradient }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default StatsCard;