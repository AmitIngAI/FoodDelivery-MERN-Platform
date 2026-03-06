import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  TextField,
  Divider,
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCartOutlined,
  LocalOffer,
  ArrowBack,
  CheckCircle,
  Info,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  updateQuantity,
  removeFromCart,
  clearCart,
  applyPromoCode,
  removePromoCode,
} from '../../../redux/slices/customerSlice';
import { promoCodes } from '../../../utils/mockData';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.customer);
  
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const deliveryFee = cart.restaurant?.freeDelivery ? 0 : 40;
  const taxRate = 0.05;
  const taxAmount = (cart.totalAmount * taxRate).toFixed(2);
  const discount = cart.discount || 0;
  const grandTotal = (parseFloat(cart.totalAmount) + deliveryFee + parseFloat(taxAmount) - discount).toFixed(2);

  const handleQuantityChange = (itemId, change) => {
    const item = cart.items.find(i => i.id === itemId);
    if (item) {
      const newQty = item.quantity + change;
      dispatch(updateQuantity({ id: itemId, quantity: newQty }));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.info('Item removed from cart');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      dispatch(clearCart());
      toast.success('Cart cleared!');
    }
  };

  const handleApplyPromo = () => {
    setPromoError('');
    const promo = promoCodes.find(
      p => p.code.toLowerCase() === promoInput.toLowerCase()
    );

    if (!promo) {
      setPromoError('Invalid promo code');
      return;
    }

    if (cart.totalAmount < promo.minOrder) {
      setPromoError(`Minimum order amount is ₹${promo.minOrder}`);
      return;
    }

    dispatch(applyPromoCode(promo));
    toast.success(`Promo code "${promo.code}" applied! 🎉`);
    setPromoInput('');
  };

  const handleRemovePromo = () => {
    dispatch(removePromoCode());
    toast.info('Promo code removed');
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  // Empty Cart
  if (cart.items.length === 0) {
    return (
      <div className="cart-page empty">
        <Container>
          <motion.div
            className="empty-cart"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="empty-cart-icon">
              <ShoppingCartOutlined />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet</p>
            <motion.button
              className="browse-btn"
              onClick={() => navigate('/restaurants')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Restaurants
            </motion.button>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Container>
        {/* Header */}
        <div className="cart-header">
          <motion.button
            className="back-btn"
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowBack />
          </motion.button>
          <div className="header-text">
            <h1>Your Cart</h1>
            <p>{cart.totalItems} item{cart.totalItems > 1 ? 's' : ''} in cart</p>
          </div>
          <motion.button
            className="clear-btn"
            onClick={handleClearCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Delete />
            Clear
          </motion.button>
        </div>

        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} lg={8}>
            {/* Restaurant Info */}
            <motion.div 
              className="restaurant-info-bar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img src={cart.restaurant?.image} alt={cart.restaurant?.name} />
              <div className="restaurant-details">
                <h3>{cart.restaurant?.name}</h3>
                <p>{cart.restaurant?.address}</p>
              </div>
              <motion.button
                className="add-more-btn"
                onClick={() => navigate(`/restaurant/${cart.restaurant?.id}`)}
                whileHover={{ scale: 1.05 }}
              >
                <Add />
                Add More
              </motion.button>
            </motion.div>

            {/* Cart Items List */}
            <div className="cart-items">
              <AnimatePresence>
                {cart.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="cart-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <img src={item.image} alt={item.name} className="item-image" />
                    
                    <div className="item-details">
                      <div className="item-header">
                        <div className={`veg-indicator ${item.isVeg ? 'veg' : 'non-veg'}`}>
                          <span></span>
                        </div>
                        <h4>{item.name}</h4>
                      </div>
                      
                      {item.selectedCustomizations && (
                        <p className="item-customizations">
                          {item.selectedCustomizations.map(c => c.name).join(', ')}
                        </p>
                      )}

                      <div className="item-footer">
                        <span className="item-price">₹{item.price}</span>
                        
                        <div className="quantity-controls">
                          <motion.button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Remove />
                          </motion.button>
                          <span className="quantity">{item.quantity}</span>
                          <motion.button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Add />
                          </motion.button>
                        </div>

                        <span className="item-total">₹{item.price * item.quantity}</span>
                      </div>
                    </div>

                    <motion.button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Delete />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Cooking Instructions */}
            <div className="cooking-instructions">
              <h4>
                <Info />
                Special Instructions
              </h4>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="Any specific preferences? E.g., less spicy, no onions, etc."
                variant="outlined"
                className="instructions-input"
              />
            </div>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} lg={4}>
            <motion.div 
              className="order-summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3>Order Summary</h3>

              {/* Promo Code */}
              <div className="promo-section">
                {!cart.appliedPromo ? (
                  <>
                    <div className="promo-input-wrapper">
                      <LocalOffer className="promo-icon" />
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                      />
                      <motion.button
                        onClick={handleApplyPromo}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!promoInput}
                      >
                        Apply
                      </motion.button>
                    </div>
                    {promoError && <p className="promo-error">{promoError}</p>}
                    <div className="available-promos">
                      <p>Try: <strong>FIRST50, FLAT100, FREESHIP</strong></p>
                    </div>
                  </>
                ) : (
                  <div className="promo-applied">
                    <div className="promo-info">
                      <CheckCircle />
                      <div>
                        <strong>{cart.appliedPromo}</strong>
                        <p>You saved ₹{discount}</p>
                      </div>
                    </div>
                    <motion.button
                      className="remove-promo"
                      onClick={handleRemovePromo}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Delete />
                    </motion.button>
                  </div>
                )}
              </div>

              <Divider className="summary-divider" />

              {/* Bill Details */}
              <div className="bill-details">
                <div className="bill-row">
                  <span>Subtotal</span>
                  <span>₹{cart.totalAmount.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="bill-row discount">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="bill-row">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'free' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>

                <div className="bill-row">
                  <span>Taxes & Charges (5%)</span>
                  <span>₹{taxAmount}</span>
                </div>

                <Divider className="bill-divider" />

                <div className="bill-row total">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <motion.button
                className="checkout-btn"
                onClick={handleCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout
                <span className="checkout-amount">₹{grandTotal}</span>
              </motion.button>

              {/* Savings Info */}
              {discount > 0 && (
                <div className="savings-info">
                  🎉 You're saving ₹{discount.toFixed(2)} on this order!
                </div>
              )}
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Cart;