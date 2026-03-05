import React from 'react';
import { motion } from 'framer-motion';
import { Restaurant, Person, DirectionsBike } from '@mui/icons-material';
import './MapView.css';

const MapView = ({ pickup, dropoff, currentStep }) => {
  // This is a placeholder component
  // In production, you would integrate with Google Maps, Mapbox, or similar
  
  return (
    <div className="map-view">
      {/* Placeholder Map */}
      <div className="map-placeholder">
        <img 
          src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/77.5946,12.9716,13,0/800x600@2x?access_token=pk.placeholder"
          alt="Map"
          className="map-image"
        />
        
        {/* Overlay for demo */}
        <div className="map-overlay">
          <div className="map-content">
            {/* Route Line */}
            <svg className="route-svg" viewBox="0 0 400 300">
              <motion.path
                d="M 100,250 Q 150,150 200,150 T 300,80"
                stroke="url(#routeGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="10,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="100%" stopColor="#4ECDC4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Pickup Marker */}
            <motion.div 
              className="map-marker pickup"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              style={{ left: '25%', bottom: '15%' }}
            >
              <div className="marker-icon">
                <Restaurant />
              </div>
              <div className="marker-pulse" />
            </motion.div>

            {/* Driver Marker */}
            <motion.div 
              className="map-marker driver"
              animate={{ 
                left: currentStep <= 1 ? '35%' : currentStep <= 2 ? '50%' : '65%',
                bottom: currentStep <= 1 ? '40%' : currentStep <= 2 ? '50%' : '60%'
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <div className="marker-icon">
                <DirectionsBike />
              </div>
            </motion.div>

            {/* Dropoff Marker */}
            <motion.div 
              className="map-marker dropoff"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
              style={{ right: '20%', top: '20%' }}
            >
              <div className="marker-icon">
                <Person />
              </div>
              <div className="marker-pulse" />
            </motion.div>
          </div>
        </div>

        {/* Distance & Time Info */}
        <div className="map-info-card">
          <div className="info-item">
            <span>Distance</span>
            <strong>3.5 km</strong>
          </div>
          <div className="info-divider" />
          <div className="info-item">
            <span>ETA</span>
            <strong>15 min</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;