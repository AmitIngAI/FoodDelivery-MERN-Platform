import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from '@mui/material';
import {
  LocationOn,
  Payment,
  CheckCircle,
  Add,
  Home,
  Work,
  LocationCity,
  CreditCard,
  AccountBalanceWallet,
  Money,
  QrCode2,
  ArrowBack,
  Edit,
  Delete,
  LocalOffer,
  Timer,
  Security,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  addAddress, 
  setSelectedAddress, 
  clearCart,
  addOrder,
} from '../../../redux/slices/customerSlice';
import { toast } from 'react-toastify';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { cart, addresses, selectedAddress } = useSelector(state => state.customer);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || null);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    pincode: '',
    type: 'home',
  });

  const steps = ['Delivery Address', 'Payment', 'Review'];

  const deliveryFee = cart.restaurant?.freeDelivery ? 0 : 40;
  const taxAmount = (cart.totalAmount * 0.05).toFixed(2);
  const discount = cart.discount || 0;
  const grandTotal = (parseFloat(cart.totalAmount) + deliveryFee + parseFloat(taxAmount) - discount).toFixed(2);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to continue');
      navigate('/login');
    }
    if (cart.items.length === 0) {
      navigate('/cart');
    }
  }, [isAuthenticated, cart.items]);

  const handleNext = () => {
    if (activeStep === 0 && !selectedAddressId) {
      toast.error('Please select a delivery address');
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.address || !newAddress.pincode) {
      toast.error('Please fill all required fields');
      return;
    }

    const address = {
      id: Date.now(),
      ...newAddress,
      isDefault: addresses.length === 0,
    };

    dispatch(addAddress(address));
    setSelectedAddressId(address.id);
    setShowAddAddress(false);
    setNewAddress({
      name: '',
      phone: '',
      address: '',
      landmark: '',
      city: '',
      pincode: '',
      type: 'home',
    });
    toast.success('Address added successfully!');
  };

  const handlePlaceOrder = async () => {
    setProcessing(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const selectedAddr = addresses.find(a => a.id === selectedAddressId);
    
    const order = {
      id: `ORD${Date.now()}`,
      restaurant: cart.restaurant,
      items: cart.items,
      subtotal: cart.totalAmount,
      deliveryFee,
      taxes: parseFloat(taxAmount),
      discount,
      totalAmount: parseFloat(grandTotal),
      status: 'confirmed',
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      address: selectedAddr,
      createdAt: new Date().toISOString(),
      estimatedTime: '30-40 min',
      driver: {
        name: 'Rajesh Kumar',
        phone: '+91 9988776655',
        avatar: 'https://i.pravatar.cc/200?img=12',
        vehicle: 'KA-01-AB-1234',
        rating: 4.8,
      },
      driverLocation: {
        lat: 12.9716,
        lng: 77.5946,
      },
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    
    setProcessing(false);
    toast.success('Order placed successfully! 🎉');
    navigate(`/order-tracking/${order.id}`);
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case 'home': return <Home />;
      case 'work': return <Work />;
      default: return <LocationCity />;
    }
  };

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: <Money />,
      description: 'Pay when you receive',
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: <QrCode2 />,
      description: 'GPay, PhonePe, Paytm',
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard />,
      description: 'Visa, Mastercard, RuPay',
    },
    {
      id: 'wallet',
      name: 'Wallet',
      icon: <AccountBalanceWallet />,
      description: 'Amazon Pay, Paytm Wallet',
    },
  ];

  return (
    <div className="checkout-page">
      <Container>
        {/* Header */}
        <div className="checkout-header">
          <motion.button
            className="back-btn"
            onClick={() => navigate('/cart')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowBack />
          </motion.button>
          <h1>Checkout</h1>
        </div>

        {/* Stepper */}
        <div className="stepper-wrapper">
          <Stepper activeStep={activeStep} alternativeLabel className="checkout-stepper">
            {steps.map((label, index) => (
              <Step key={label} completed={activeStep > index}>
                <StepLabel
                  StepIconComponent={() => (
                    <div className={`step-icon ${activeStep >= index ? 'active' : ''} ${activeStep > index ? 'completed' : ''}`}>
                      {activeStep > index ? <CheckCircle /> : index + 1}
                    </div>
                  )}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            <AnimatePresence mode="wait">
              {/* Step 1: Address */}
              {activeStep === 0 && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="step-content"
                >
                  <div className="step-header">
                    <LocationOn />
                    <h2>Select Delivery Address</h2>
                  </div>

                  <div className="addresses-list">
                    <RadioGroup
                      value={selectedAddressId}
                      onChange={(e) => setSelectedAddressId(Number(e.target.value))}
                    >
                      {addresses.map((address) => (
                        <motion.div
                          key={address.id}
                          className={`address-card ${selectedAddressId === address.id ? 'selected' : ''}`}
                          whileHover={{ scale: 1.01 }}
                        >
                          <FormControlLabel
                            value={address.id}
                            control={<Radio />}
                            label={
                              <div className="address-content">
                                <div className="address-header">
                                  <span className={`address-type ${address.type}`}>
                                    {getAddressIcon(address.type)}
                                    {address.type}
                                  </span>
                                  {address.isDefault && (
                                    <span className="default-badge">Default</span>
                                  )}
                                </div>
                                <h4>{address.name}</h4>
                                <p>{address.address}</p>
                                {address.landmark && <p className="landmark">Near: {address.landmark}</p>}
                                <p>{address.city} - {address.pincode}</p>
                                <p className="phone">📞 {address.phone}</p>
                              </div>
                            }
                          />
                        </motion.div>
                      ))}
                    </RadioGroup>

                    <motion.button
                      className="add-address-btn"
                      onClick={() => setShowAddAddress(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Add />
                      Add New Address
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {activeStep === 1 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="step-content"
                >
                  <div className="step-header">
                    <Payment />
                    <h2>Select Payment Method</h2>
                  </div>

                  <div className="payment-methods">
                    <RadioGroup
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      {paymentMethods.map((method) => (
                        <motion.div
                          key={method.id}
                          className={`payment-card ${paymentMethod === method.id ? 'selected' : ''}`}
                          whileHover={{ scale: 1.01 }}
                        >
                          <FormControlLabel
                            value={method.id}
                            control={<Radio />}
                            label={
                              <div className="payment-content">
                                <div className="payment-icon">
                                  {method.icon}
                                </div>
                                <div className="payment-info">
                                  <h4>{method.name}</h4>
                                  <p>{method.description}</p>
                                </div>
                              </div>
                            }
                          />
                        </motion.div>
                      ))}
                    </RadioGroup>

                    {paymentMethod === 'card' && (
                      <motion.div
                        className="card-form"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                      >
                        <TextField
                          fullWidth
                          label="Card Number"
                          placeholder="1234 5678 9012 3456"
                          margin="normal"
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="Expiry Date"
                              placeholder="MM/YY"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="CVV"
                              placeholder="123"
                              type="password"
                            />
                          </Grid>
                        </Grid>
                        <TextField
                          fullWidth
                          label="Name on Card"
                          placeholder="John Doe"
                          margin="normal"
                        />
                      </motion.div>
                    )}

                    <div className="secure-badge">
                      <Security />
                      <span>100% Secure Payments</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {activeStep === 2 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="step-content"
                >
                  <div className="step-header">
                    <CheckCircle />
                    <h2>Review Your Order</h2>
                  </div>

                  {/* Delivery Address */}
                  <div className="review-section">
                    <div className="review-header">
                      <h3>Delivery Address</h3>
                      <button onClick={() => setActiveStep(0)}>
                        <Edit /> Change
                      </button>
                    </div>
                    {addresses.find(a => a.id === selectedAddressId) && (
                      <div className="review-address">
                        <LocationOn />
                        <div>
                          <strong>{addresses.find(a => a.id === selectedAddressId).name}</strong>
                          <p>{addresses.find(a => a.id === selectedAddressId).address}</p>
                          <p>{addresses.find(a => a.id === selectedAddressId).city} - {addresses.find(a => a.id === selectedAddressId).pincode}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="review-section">
                    <div className="review-header">
                      <h3>Payment Method</h3>
                      <button onClick={() => setActiveStep(1)}>
                        <Edit /> Change
                      </button>
                    </div>
                    <div className="review-payment">
                      {paymentMethods.find(p => p.id === paymentMethod)?.icon}
                      <span>{paymentMethods.find(p => p.id === paymentMethod)?.name}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="review-section">
                    <h3>Order Items ({cart.totalItems})</h3>
                    <div className="review-items">
                      {cart.items.map((item) => (
                        <div key={item.id} className="review-item">
                          <img src={item.image} alt={item.name} />
                          <div className="item-info">
                            <h4>{item.name}</h4>
                            <span className="item-qty">x{item.quantity}</span>
                          </div>
                          <span className="item-price">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Estimated Time */}
                  <div className="estimated-time">
                    <Timer />
                    <div>
                      <span>Estimated Delivery</span>
                      <strong>30-40 minutes</strong>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="step-actions">
              <motion.button
                className="btn-back"
                onClick={handleBack}
                disabled={activeStep === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back
              </motion.button>

              {activeStep < steps.length - 1 ? (
                <motion.button
                  className="btn-next"
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
              ) : (
                <motion.button
                  className="btn-place-order"
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {processing ? (
                    <span className="processing">
                      <span className="spinner"></span>
                      Processing...
                    </span>
                  ) : (
                    `Place Order • ₹${grandTotal}`
                  )}
                </motion.button>
              )}
            </div>
          </Grid>

          {/* Order Summary Sidebar */}
          <Grid item xs={12} lg={4}>
            <motion.div
              className="order-summary-sidebar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3>Order Summary</h3>

              {/* Restaurant */}
              <div className="summary-restaurant">
                <img src={cart.restaurant?.image} alt={cart.restaurant?.name} />
                <div>
                  <h4>{cart.restaurant?.name}</h4>
                  <p>{cart.items.length} items</p>
                </div>
              </div>

              <Divider />

              {/* Items */}
              <div className="summary-items">
                {cart.items.map((item) => (
                  <div key={item.id} className="summary-item">
                    <span>{item.name} x{item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <Divider />

              {/* Bill */}
              <div className="summary-bill">
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
                  <span>Taxes</span>
                  <span>₹{taxAmount}</span>
                </div>
                <Divider />
                <div className="bill-row total">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {cart.appliedPromo && (
                <div className="promo-applied-badge">
                  <LocalOffer />
                  <span>Code {cart.appliedPromo} applied</span>
                </div>
              )}
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Add Address Dialog */}
      <Dialog
        open={showAddAddress}
        onClose={() => setShowAddAddress(false)}
        maxWidth="sm"
        fullWidth
        className="add-address-dialog"
      >
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          <div className="address-type-selector">
            {['home', 'work', 'other'].map((type) => (
              <button
                key={type}
                className={newAddress.type === type ? 'active' : ''}
                onClick={() => setNewAddress({ ...newAddress, type })}
              >
                {getAddressIcon(type)}
                {type}
              </button>
            ))}
          </div>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name *"
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number *"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address *"
                multiline
                rows={2}
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Landmark"
                value={newAddress.landmark}
                onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City *"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pincode *"
                value={newAddress.pincode}
                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddAddress(false)}>Cancel</Button>
          <Button onClick={handleAddAddress} variant="contained" className="save-btn">
            Save Address
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Checkout;