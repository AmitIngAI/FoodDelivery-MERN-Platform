import React, { useState } from 'react';
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  PhotoCamera,
  Restaurant,
  Schedule,
  Payment,
  Notifications,
  Security,
  LocationOn,
  Phone,
  Email,
  Language,
  Save,
  Add,
  Delete,
  Edit,
  AccessTime,
  CurrencyRupee,
  Percent,
  DeliveryDining,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });
  
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'Pizza Paradise',
    description: 'Authentic Italian pizzas made with love and fresh ingredients',
    logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200',
    coverImage: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=1200',
    phone: '+91 9876543210',
    email: 'contact@pizzaparadise.com',
    address: '123, MG Road, Koramangala',
    city: 'Bangalore',
    pincode: '560034',
    cuisines: ['Italian', 'Pizza', 'Fast Food'],
    priceForTwo: 400,
    isVeg: false,
  });

  const [timings, setTimings] = useState({
    monday: { isOpen: true, open: '10:00', close: '23:00' },
    tuesday: { isOpen: true, open: '10:00', close: '23:00' },
    wednesday: { isOpen: true, open: '10:00', close: '23:00' },
    thursday: { isOpen: true, open: '10:00', close: '23:00' },
    friday: { isOpen: true, open: '10:00', close: '23:30' },
    saturday: { isOpen: true, open: '10:00', close: '00:00' },
    sunday: { isOpen: true, open: '11:00', close: '23:00' },
  });

  const [deliverySettings, setDeliverySettings] = useState({
    deliveryEnabled: true,
    pickupEnabled: true,
    minOrderAmount: 150,
    deliveryFee: 30,
    freeDeliveryAbove: 500,
    maxDeliveryDistance: 10,
    avgPrepTime: '25-30',
  });

  const [paymentSettings, setPaymentSettings] = useState({
    cashOnDelivery: true,
    onlinePayment: true,
    upi: true,
    cards: true,
    wallets: true,
    bankAccount: {
      accountName: 'Pizza Paradise Pvt Ltd',
      accountNumber: '1234567890',
      ifscCode: 'HDFC0001234',
      bankName: 'HDFC Bank',
    },
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newOrders: true,
    orderUpdates: true,
    reviews: true,
    promotions: false,
    sound: true,
    email: true,
    sms: false,
  });

  const cuisineOptions = [
    'Italian', 'Pizza', 'Fast Food', 'Chinese', 'Indian', 
    'Mughlai', 'South Indian', 'Continental', 'Mexican', 'Thai'
  ];

  const handleSave = () => {
    setSnackbar({
      open: true,
      message: 'Settings saved successfully!',
      type: 'success',
    });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderRestaurantInfo = () => (
    <div className="settings-section">
      <h3 className="section-title">
        <Restaurant />
        Restaurant Information
      </h3>

      <div className="image-upload-row">
        <div className="logo-upload">
          <label>Logo</label>
          <div className="upload-preview">
            <Avatar
              src={restaurantInfo.logo}
              className="logo-preview"
            >
              {restaurantInfo.name.charAt(0)}
            </Avatar>
            <IconButton className="upload-btn">
              <PhotoCamera />
            </IconButton>
          </div>
        </div>

        <div className="cover-upload">
          <label>Cover Image</label>
          <div
            className="cover-preview"
            style={{ backgroundImage: `url(${restaurantInfo.coverImage})` }}
          >
            <IconButton className="upload-btn">
              <PhotoCamera />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="form-grid">
        <TextField
          fullWidth
          label="Restaurant Name"
          value={restaurantInfo.name}
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, name: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Restaurant className="input-icon" />
              </InputAdornment>
            ),
          }}
        />

        <FormControl fullWidth>
          <InputLabel>Cuisines</InputLabel>
          <Select
            multiple
            value={restaurantInfo.cuisines}
            onChange={(e) => setRestaurantInfo({ ...restaurantInfo, cuisines: e.target.value })}
            renderValue={(selected) => (
              <div className="chips-container">
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </div>
            )}
          >
            {cuisineOptions.map((cuisine) => (
              <MenuItem key={cuisine} value={cuisine}>
                {cuisine}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TextField
        fullWidth
        multiline
        rows={3}
        label="Description"
        value={restaurantInfo.description}
        onChange={(e) => setRestaurantInfo({ ...restaurantInfo, description: e.target.value })}
      />

      <div className="form-grid">
        <TextField
          fullWidth
          label="Phone"
          value={restaurantInfo.phone}
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, phone: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone className="input-icon" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Email"
          value={restaurantInfo.email}
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, email: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email className="input-icon" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <TextField
        fullWidth
        label="Address"
        value={restaurantInfo.address}
        onChange={(e) => setRestaurantInfo({ ...restaurantInfo, address: e.target.value })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOn className="input-icon" />
            </InputAdornment>
          ),
        }}
      />

      <div className="form-grid three-cols">
        <TextField
          fullWidth
          label="City"
          value={restaurantInfo.city}
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, city: e.target.value })}
        />

        <TextField
          fullWidth
          label="Pincode"
          value={restaurantInfo.pincode}
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, pincode: e.target.value })}
        />

        <TextField
          fullWidth
          type="number"
          label="Price for Two"
          value={restaurantInfo.priceForTwo}
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, priceForTwo: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CurrencyRupee className="input-icon" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <FormControlLabel
        control={
          <Switch
            checked={restaurantInfo.isVeg}
            onChange={(e) => setRestaurantInfo({ ...restaurantInfo, isVeg: e.target.checked })}
            color="success"
          />
        }
        label="Pure Vegetarian Restaurant"
      />
    </div>
  );

  const renderTimings = () => (
    <div className="settings-section">
      <h3 className="section-title">
        <Schedule />
        Operating Hours
      </h3>

      <div className="timings-list">
        {Object.entries(timings).map(([day, timing]) => (
          <div key={day} className="timing-row">
            <div className="day-info">
              <FormControlLabel
                control={
                  <Switch
                    checked={timing.isOpen}
                    onChange={(e) =>
                      setTimings({
                        ...timings,
                        [day]: { ...timing, isOpen: e.target.checked },
                      })
                    }
                    color="success"
                  />
                }
                label=""
              />
              <span className="day-name">{day.charAt(0).toUpperCase() + day.slice(1)}</span>
            </div>

            {timing.isOpen ? (
              <div className="time-inputs">
                <TextField
                  type="time"
                  label="Opens"
                  value={timing.open}
                  onChange={(e) =>
                    setTimings({
                      ...timings,
                      [day]: { ...timing, open: e.target.value },
                    })
                  }
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
                <span className="to-text">to</span>
                <TextField
                  type="time"
                  label="Closes"
                  value={timing.close}
                  onChange={(e) =>
                    setTimings({
                      ...timings,
                      [day]: { ...timing, close: e.target.value },
                    })
                  }
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            ) : (
              <Chip label="Closed" color="error" variant="outlined" size="small" />
            )}
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            const allDays = {};
            Object.keys(timings).forEach((day) => {
              allDays[day] = { ...timings[day], isOpen: true };
            });
            setTimings(allDays);
          }}
        >
          Open All Days
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            const defaultTime = { isOpen: true, open: '10:00', close: '23:00' };
            const allDays = {};
            Object.keys(timings).forEach((day) => {
              allDays[day] = defaultTime;
            });
            setTimings(allDays);
          }}
        >
          Apply Same Time to All
        </Button>
      </div>
    </div>
  );

  const renderDeliverySettings = () => (
    <div className="settings-section">
      <h3 className="section-title">
        <DeliveryDining />
        Delivery Settings
      </h3>

      <div className="toggle-cards">
        <div className={`toggle-card ${deliverySettings.deliveryEnabled ? 'active' : ''}`}>
          <div className="toggle-card-content">
            <DeliveryDining />
            <div>
              <h4>Home Delivery</h4>
              <p>Allow customers to get orders delivered</p>
            </div>
          </div>
          <Switch
            checked={deliverySettings.deliveryEnabled}
            onChange={(e) =>
              setDeliverySettings({ ...deliverySettings, deliveryEnabled: e.target.checked })
            }
            color="success"
          />
        </div>

        <div className={`toggle-card ${deliverySettings.pickupEnabled ? 'active' : ''}`}>
          <div className="toggle-card-content">
            <Restaurant />
            <div>
              <h4>Self Pickup</h4>
              <p>Allow customers to pickup from restaurant</p>
            </div>
          </div>
          <Switch
            checked={deliverySettings.pickupEnabled}
            onChange={(e) =>
              setDeliverySettings({ ...deliverySettings, pickupEnabled: e.target.checked })
            }
            color="success"
          />
        </div>
      </div>

      <Divider className="section-divider" />

      <div className="form-grid">
        <TextField
          fullWidth
          type="number"
          label="Minimum Order Amount"
          value={deliverySettings.minOrderAmount}
          onChange={(e) =>
            setDeliverySettings({ ...deliverySettings, minOrderAmount: Number(e.target.value) })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CurrencyRupee className="input-icon" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          type="number"
          label="Delivery Fee"
          value={deliverySettings.deliveryFee}
          onChange={(e) =>
            setDeliverySettings({ ...deliverySettings, deliveryFee: Number(e.target.value) })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CurrencyRupee className="input-icon" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          type="number"
          label="Free Delivery Above"
          value={deliverySettings.freeDeliveryAbove}
          onChange={(e) =>
            setDeliverySettings({ ...deliverySettings, freeDeliveryAbove: Number(e.target.value) })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CurrencyRupee className="input-icon" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          type="number"
          label="Max Delivery Distance (km)"
          value={deliverySettings.maxDeliveryDistance}
          onChange={(e) =>
            setDeliverySettings({
              ...deliverySettings,
              maxDeliveryDistance: Number(e.target.value),
            })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn className="input-icon" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <TextField
        fullWidth
        label="Average Preparation Time"
        value={deliverySettings.avgPrepTime}
        onChange={(e) =>
          setDeliverySettings({ ...deliverySettings, avgPrepTime: e.target.value })
        }
        placeholder="e.g., 25-30 min"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccessTime className="input-icon" />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="settings-section">
      <h3 className="section-title">
        <Payment />
        Payment Settings
      </h3>

      <div className="payment-methods">
        <h4>Accepted Payment Methods</h4>
        <div className="payment-toggles">
          <FormControlLabel
            control={
              <Switch
                checked={paymentSettings.cashOnDelivery}
                onChange={(e) =>
                  setPaymentSettings({ ...paymentSettings, cashOnDelivery: e.target.checked })
                }
                color="success"
              />
            }
            label="Cash on Delivery"
          />
          <FormControlLabel
            control={
              <Switch
                checked={paymentSettings.onlinePayment}
                onChange={(e) =>
                  setPaymentSettings({ ...paymentSettings, onlinePayment: e.target.checked })
                }
                color="success"
              />
            }
            label="Online Payment"
          />
          <FormControlLabel
            control={
              <Switch
                checked={paymentSettings.upi}
                onChange={(e) =>
                  setPaymentSettings({ ...paymentSettings, upi: e.target.checked })
                }
                color="success"
              />
            }
            label="UPI"
          />
          <FormControlLabel
            control={
              <Switch
                checked={paymentSettings.cards}
                onChange={(e) =>
                  setPaymentSettings({ ...paymentSettings, cards: e.target.checked })
                }
                color="success"
              />
            }
            label="Credit/Debit Cards"
          />
          <FormControlLabel
            control={
              <Switch
                checked={paymentSettings.wallets}
                onChange={(e) =>
                  setPaymentSettings({ ...paymentSettings, wallets: e.target.checked })
                }
                color="success"
              />
            }
            label="Wallets (Paytm, PhonePe, etc.)"
          />
        </div>
      </div>

      <Divider className="section-divider" />

      <div className="bank-details">
        <h4>Bank Account Details (for payouts)</h4>
        <div className="form-grid">
          <TextField
            fullWidth
            label="Account Holder Name"
            value={paymentSettings.bankAccount.accountName}
            onChange={(e) =>
              setPaymentSettings({
                ...paymentSettings,
                bankAccount: { ...paymentSettings.bankAccount, accountName: e.target.value },
              })
            }
          />
          <TextField
            fullWidth
            label="Bank Name"
            value={paymentSettings.bankAccount.bankName}
            onChange={(e) =>
              setPaymentSettings({
                ...paymentSettings,
                bankAccount: { ...paymentSettings.bankAccount, bankName: e.target.value },
              })
            }
          />
          <TextField
            fullWidth
            label="Account Number"
            value={paymentSettings.bankAccount.accountNumber}
            onChange={(e) =>
              setPaymentSettings({
                ...paymentSettings,
                bankAccount: { ...paymentSettings.bankAccount, accountNumber: e.target.value },
              })
            }
          />
          <TextField
            fullWidth
            label="IFSC Code"
            value={paymentSettings.bankAccount.ifscCode}
            onChange={(e) =>
              setPaymentSettings({
                ...paymentSettings,
                bankAccount: { ...paymentSettings.bankAccount, ifscCode: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="settings-section">
      <h3 className="section-title">
        <Notifications />
        Notification Preferences
      </h3>

      <div className="notification-categories">
        <div className="notification-category">
          <h4>Order Notifications</h4>
          <FormControlLabel
            control={
              <Switch
                checked={notificationSettings.newOrders}
                onChange={(e) =>
                  setNotificationSettings({ ...notificationSettings, newOrders: e.target.checked })
                }
                color="success"
              />
            }
            label="New Orders"
          />
          <FormControlLabel
            control={
              <Switch
                checked={notificationSettings.orderUpdates}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    orderUpdates: e.target.checked,
                  })
                }
                color="success"
              />
            }
            label="Order Status Updates"
          />
        </div>

        <div className="notification-category">
          <h4>Other Notifications</h4>
          <FormControlLabel
            control={
              <Switch
                checked={notificationSettings.reviews}
                onChange={(e) =>
                  setNotificationSettings({ ...notificationSettings, reviews: e.target.checked })
                }
                color="success"
              />
            }
            label="New Reviews"
          />
          <FormControlLabel
            control={
              <Switch
                checked={notificationSettings.promotions}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    promotions: e.target.checked,
                  })
                }
                color="success"
              />
            }
            label="Promotions & Updates"
          />
        </div>

        <div className="notification-category">
          <h4>Notification Channels</h4>
          <FormControlLabel
            control={
              <Switch
                checked={notificationSettings.sound}
                onChange={(e) =>
                  setNotificationSettings({ ...notificationSettings, sound: e.target.checked })
                }
                color="success"
              />
            }
            label="Sound Alerts"
          />
          <FormControlLabel
            control={
              <Switch
                checked={notificationSettings.email}
                onChange={(e) =>
                  setNotificationSettings({ ...notificationSettings, email: e.target.checked })
                }
                color="success"
              />
            }
            label="Email Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={notificationSettings.sms}
                onChange={(e) =>
                  setNotificationSettings({ ...notificationSettings, sms: e.target.checked })
                }
                color="success"
              />
            }
            label="SMS Notifications"
          />
        </div>
      </div>
    </div>
  );

  const tabContent = [
    renderRestaurantInfo(),
    renderTimings(),
    renderDeliverySettings(),
    renderPaymentSettings(),
    renderNotifications(),
  ];

  return (
    <motion.div
      className="settings-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="settings-header">
        <div className="header-content">
          <h1>Settings</h1>
          <p>Manage your restaurant settings and preferences</p>
        </div>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          className="save-btn"
        >
          Save Changes
        </Button>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <Tabs
            orientation="vertical"
            value={activeTab}
            onChange={handleTabChange}
            className="settings-tabs"
          >
            <Tab icon={<Restaurant />} label="Restaurant Info" />
            <Tab icon={<Schedule />} label="Operating Hours" />
            <Tab icon={<DeliveryDining />} label="Delivery" />
            <Tab icon={<Payment />} label="Payments" />
            <Tab icon={<Notifications />} label="Notifications" />
          </Tabs>
        </div>

        <div className="settings-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.type}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default Settings;