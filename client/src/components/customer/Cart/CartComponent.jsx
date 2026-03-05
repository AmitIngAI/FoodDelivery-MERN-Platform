import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Add,
  Remove,
  Delete,
  ShoppingCart,
  LocalOffer,
  ArrowForward,
  Close,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { 
  updateQuantity, 
  removeFromCart, 
  clearCart 
} from '../../../redux/slices/customerSlice';
import './CartComponent.css';

// Mini Cart Sidebar/Drawer
const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.customer);

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const deliveryFee = cart.totalAmount >= 500 ? 0 : 40;
  const finalAmount = cart.totalAmount + deliveryFee - cart.discount;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            className="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header */}
            <div className="cart-sidebar-header">
              <div className="header-title">
                <ShoppingCart />
                <h3>Your Cart</h3>
                <span className="item-count">{cart.totalItems} items</span>
              </div>
              <IconButton onClick={onClose} className="close-btn">
                <Close />
              </IconButton>
            </div>

            {/* Empty State */}
            {cart.items.length === 0 ? (
              <div className="cart-empty">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                  className="empty-icon"
                >
                  🛒
                </motion.div>
                <h4>Your cart is empty</h4>
                <p>Add items to get started</p>
                <button className="browse-btn" onClick={() => { onClose(); navigate('/restaurants'); }}>
                  Browse Restaurants
                </button>
              </div>
            ) : (
              <>
                {/* Restaurant Info */}
                {cart.restaurant && (
                  <div className="cart-restaurant">
                    <img src={cart.restaurant.image} alt={cart.restaurant.name} />
                    <div>
                      <h4>{cart.restaurant.name}</h4>
                      <p>{cart.restaurant.cuisines?.slice(0, 2).join(' • ')}</p>
                    </div>
                  </div>
                )}

                {/* Cart Items */}
                <div className="cart-items">
                  <AnimatePresence>
                    {cart.items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="cart-item"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        layout
                      >
                        <div className="cart-item-info">
                          <div className={`veg-indicator small ${item.isVeg ? 'veg' : 'non-veg'}`}>
                            <span />
                          </div>
                          <div className="item-details">
                            <h5>{item.name}</h5>
                            <p className="item-price">₹{item.price}</p>
                          </div>
                        </div>
                        <div className="cart-item-actions">
                          <div className="quantity-controls">
                            <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                              <Remove />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                              <Add />
                            </button>
                          </div>
                          <span className="item-total">₹{item.price * item.quantity}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Promo Code */}
                <div className="cart-promo">
                  <LocalOffer />
                  <input type="text" placeholder="Apply promo code" />
                  <button>Apply</button>
                </div>

                {/* Bill Details */}
                <div className="cart-bill">
                  <h4>Bill Details</h4>
                  <div className="bill-row">
                    <span>Item Total</span>
                    <span>₹{cart.totalAmount}</span>
                  </div>
                  <div className="bill-row">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? 'free' : ''}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {cart.discount > 0 && (
                    <div className="bill-row discount">
                      <span>Discount</span>
                      <span>-₹{cart.discount}</span>
                    </div>
                  )}
                  <div className="bill-row total">
                    <span>To Pay</span>
                    <span>₹{finalAmount}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="cart-footer">
                  <button className="checkout-btn" onClick={handleCheckout}>
                    <span>Proceed to Checkout</span>
                    <span className="checkout-amount">₹{finalAmount}</span>
                    <ArrowForward />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Floating Cart Button
export const FloatingCartButton = ({ onClick }) => {
  const { cart } = useSelector(state => state.customer);

  if (cart.items.length === 0) return null;

  return (
    <motion.button
      className="floating-cart-btn"
      onClick={onClick}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="floating-cart-content">
        <div className="cart-info">
          <span className="item-count">{cart.totalItems} items</span>
          <span className="cart-total">₹{cart.totalAmount}</span>
        </div>
        <div className="view-cart">
          <span>View Cart</span>
          <ShoppingCart />
        </div>
      </div>
    </motion.button>
  );
};

// Cart Item Row (for Cart Page)
export const CartItemRow = ({ item, onQuantityChange, onRemove }) => {
  return (
    <motion.div 
      className="cart-item-row"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="item-content">
        <div className="item-header">
          <div className={`veg-indicator ${item.isVeg ? 'veg' : 'non-veg'}`}>
            <span />
          </div>
          <h4>{item.name}</h4>
        </div>
        <p className="item-desc">{item.description?.slice(0, 50)}...</p>
        <div className="item-footer">
          <span className="price">₹{item.price}</span>
          <div className="qty-control">
            <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>
              <Remove />
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
              <Add />
            </button>
          </div>
          <span className="total-price">₹{item.price * item.quantity}</span>
        </div>
      </div>

      <IconButton className="remove-btn" onClick={() => onRemove(item.id)}>
        <Delete />
      </IconButton>
    </motion.div>
  );
};

// Empty Cart Component
export const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="empty-cart-page"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="empty-cart-content">
        <motion.div 
          className="empty-illustration"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🛒
        </motion.div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <motion.button
          className="btn btn-primary"
          onClick={() => navigate('/restaurants')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Restaurants
          <ArrowForward />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CartSidebar;