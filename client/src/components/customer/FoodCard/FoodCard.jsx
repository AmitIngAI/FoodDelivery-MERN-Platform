import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Add,
  Remove,
  Star,
  Whatshot,
  LocalOffer,
  ExpandMore,
} from '@mui/icons-material';
import { addToCart, updateQuantity } from '../../../redux/slices/customerSlice';
import './FoodCard.css';

const FoodCard = ({ item, restaurant }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.customer);
  const [showCustomization, setShowCustomization] = useState(false);
  
  const cartItem = cart.items.find(i => i.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (item.customizations && item.customizations.length > 0) {
      setShowCustomization(true);
    } else {
      dispatch(addToCart({ item, restaurant }));
    }
  };

  const handleUpdateQuantity = (newQuantity) => {
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const discountPercentage = item.originalPrice 
    ? Math.round((1 - item.price / item.originalPrice) * 100) 
    : 0;

  return (
    <>
      <motion.div
        className="food-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Content Section */}
        <div className="food-card-content">
          {/* Veg/Non-veg Indicator */}
          <div className={`veg-indicator ${item.isVeg ? 'veg' : 'non-veg'}`}>
            <span />
          </div>

          {/* Badges */}
          <div className="food-badges">
            {item.isBestseller && (
              <span className="badge bestseller">
                <Star /> Bestseller
              </span>
            )}
            {item.spiceLevel >= 2 && (
              <span className="badge spicy">
                <Whatshot /> Spicy
              </span>
            )}
          </div>

          {/* Name & Description */}
          <h4 className="food-name">{item.name}</h4>
          <p className="food-description">{item.description}</p>

          {/* Price */}
          <div className="food-price-row">
            <div className="food-price">
              <span className="current-price">₹{item.price}</span>
              {item.originalPrice && (
                <>
                  <span className="original-price">₹{item.originalPrice}</span>
                  <span className="discount-badge">
                    <LocalOffer />
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Rating */}
          {item.rating && (
            <div className="food-rating">
              <Star />
              <span>{item.rating}</span>
              <span className="rating-count">({item.reviews})</span>
            </div>
          )}

          {/* Customization Indicator */}
          {item.customizations && item.customizations.length > 0 && (
            <p className="customization-text">Customizable</p>
          )}
        </div>

        {/* Image Section */}
        <div className="food-card-image-section">
          <div className="food-image-container">
            <img src={item.image} alt={item.name} className="food-image" />
            
            {/* Add/Quantity Button */}
            <div className="food-action">
              <AnimatePresence mode="wait">
                {quantity === 0 ? (
                  <motion.button
                    key="add"
                    className="add-btn"
                    onClick={handleAddToCart}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={!item.isAvailable}
                  >
                    {item.isAvailable ? 'ADD' : 'Unavailable'}
                    {item.isAvailable && <Add />}
                  </motion.button>
                ) : (
                  <motion.div
                    key="quantity"
                    className="quantity-control"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                  >
                    <button 
                      onClick={() => handleUpdateQuantity(quantity - 1)}
                      className="qty-btn minus"
                    >
                      <Remove />
                    </button>
                    <span className="qty-value">{quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(quantity + 1)}
                      className="qty-btn plus"
                    >
                      <Add />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Customization Note */}
          {item.customizations && quantity > 0 && (
            <button 
              className="customize-btn"
              onClick={() => setShowCustomization(true)}
            >
              Customize <ExpandMore />
            </button>
          )}
        </div>
      </motion.div>

      {/* Customization Modal */}
      <AnimatePresence>
        {showCustomization && (
          <CustomizationModal
            item={item}
            restaurant={restaurant}
            onClose={() => setShowCustomization(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Customization Modal Component
const CustomizationModal = ({ item, restaurant, onClose }) => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(item.price);

  const handleOptionSelect = (groupTitle, option, isRequired) => {
    const newOptions = { ...selectedOptions };
    
    if (isRequired) {
      newOptions[groupTitle] = option;
    } else {
      if (!newOptions[groupTitle]) {
        newOptions[groupTitle] = [];
      }
      const index = newOptions[groupTitle].findIndex(o => o.name === option.name);
      if (index > -1) {
        newOptions[groupTitle].splice(index, 1);
      } else {
        newOptions[groupTitle].push(option);
      }
    }
    
    setSelectedOptions(newOptions);
    calculateTotal(newOptions);
  };

  const calculateTotal = (options) => {
    let total = item.price;
    Object.values(options).forEach(opt => {
      if (Array.isArray(opt)) {
        opt.forEach(o => total += o.price);
      } else if (opt) {
        total += opt.price;
      }
    });
    setTotalPrice(total);
  };

  const handleAddItem = () => {
    const customizedItem = {
      ...item,
      price: totalPrice,
      customizations: selectedOptions,
    };
    dispatch(addToCart({ item: customizedItem, restaurant }));
    onClose();
  };

  const isValid = () => {
    const requiredGroups = item.customizations.filter(g => g.required);
    return requiredGroups.every(g => selectedOptions[g.title]);
  };

  return (
    <motion.div
      className="customization-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="customization-modal"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="customization-header">
          <div className="customization-item-info">
            <div className={`veg-indicator ${item.isVeg ? 'veg' : 'non-veg'}`}>
              <span />
            </div>
            <h3>{item.name}</h3>
          </div>
          <button className="close-custom-btn" onClick={onClose}>×</button>
        </div>

        {/* Options */}
        <div className="customization-body">
          {item.customizations.map((group, idx) => (
            <div key={idx} className="option-group">
              <div className="option-group-header">
                <h4>{group.title}</h4>
                <span className={group.required ? 'required' : 'optional'}>
                  {group.required ? 'Required' : 'Optional'}
                </span>
              </div>
              <div className="option-list">
                {group.options.map((option, optIdx) => {
                  const isSelected = group.required 
                    ? selectedOptions[group.title]?.name === option.name
                    : selectedOptions[group.title]?.some(o => o.name === option.name);
                  
                  return (
                    <label 
                      key={optIdx} 
                      className={`option-item ${isSelected ? 'selected' : ''}`}
                    >
                      <input
                        type={group.required ? 'radio' : 'checkbox'}
                        name={group.title}
                        checked={isSelected}
                        onChange={() => handleOptionSelect(group.title, option, group.required)}
                      />
                      <span className="option-name">{option.name}</span>
                      {option.price > 0 && (
                        <span className="option-price">+₹{option.price}</span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="customization-footer">
          <div className="total-price">
            <span>Total</span>
            <strong>₹{totalPrice}</strong>
          </div>
          <button 
            className="add-item-btn"
            onClick={handleAddItem}
            disabled={!isValid()}
          >
            Add Item
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Horizontal Food Card Variant
export const FoodCardHorizontal = ({ item, restaurant, onAdd }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.customer);
  const cartItem = cart.items.find(i => i.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <motion.div 
      className="food-card-horizontal"
      whileHover={{ scale: 1.02 }}
    >
      <img src={item.image} alt={item.name} />
      <div className="horizontal-food-content">
        <div className={`veg-indicator small ${item.isVeg ? 'veg' : 'non-veg'}`}>
          <span />
        </div>
        <h5>{item.name}</h5>
        <p>₹{item.price}</p>
      </div>
      <motion.button
        className="quick-add-btn"
        whileTap={{ scale: 0.9 }}
        onClick={() => dispatch(addToCart({ item, restaurant }))}
      >
        {quantity > 0 ? quantity : <Add />}
      </motion.button>
    </motion.div>
  );
};

// Compact Food Card
export const FoodCardCompact = ({ item, restaurant }) => {
  const dispatch = useDispatch();

  return (
    <motion.div 
      className="food-card-compact"
      whileHover={{ y: -5 }}
    >
      <div className="compact-image">
        <img src={item.image} alt={item.name} />
        {item.isBestseller && <span className="compact-badge">★</span>}
      </div>
      <div className="compact-content">
        <h5>{item.name}</h5>
        <div className="compact-footer">
          <span>₹{item.price}</span>
          <button onClick={() => dispatch(addToCart({ item, restaurant }))}>
            <Add />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;