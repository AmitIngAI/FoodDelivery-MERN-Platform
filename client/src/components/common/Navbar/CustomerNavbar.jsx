import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  InputBase,
  Fade,
} from '@mui/material';
import {
  ShoppingCart,
  Menu as MenuIcon,
  Person,
  LocationOn,
  Favorite,
  Receipt,
  ExitToApp,
  Home,
  Restaurant,
  LocalOffer,
  Search,
  Close,
  KeyboardArrowDown,
  Notifications,
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../../../redux/slices/authSlice';
import { toggleTheme } from '../../../redux/slices/uiSlice';
import './CustomerNavbar.css';

const CustomerNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { cart } = useSelector(state => state.customer);
  const { theme: currentTheme } = useSelector(state => state.ui);
  
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleMenuClose();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchOpen(false);
    }
  };

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Restaurants', icon: <Restaurant />, path: '/restaurants' },
    { text: 'Offers', icon: <LocalOffer />, path: '/offers' },
    { text: 'My Orders', icon: <Receipt />, path: '/orders' },
    { text: 'Favorites', icon: <Favorite />, path: '/favorites' },
  ];

  const drawer = (
    <motion.div 
      className="mobile-drawer"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
    >
      <div className="drawer-header">
        <div className="drawer-logo">
          <img src="/logo.png" alt="Logo" />
          <span>FoodDelivery Pro</span>
        </div>
        <IconButton onClick={() => setMobileOpen(false)}>
          <Close />
        </IconButton>
      </div>

      {isAuthenticated && (
        <div className="drawer-user">
          <Avatar src={user?.avatar} className="drawer-avatar">
            {user?.name?.charAt(0)}
          </Avatar>
          <div>
            <h4>{user?.name}</h4>
            <p>{user?.email}</p>
          </div>
        </div>
      )}

      <List className="drawer-menu">
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            className={location.pathname === item.path ? 'active' : ''}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <div className="drawer-footer">
        {isAuthenticated ? (
          <button className="drawer-logout" onClick={handleLogout}>
            <ExitToApp />
            <span>Logout</span>
          </button>
        ) : (
          <button className="drawer-login" onClick={() => navigate('/login')}>
            <Person />
            <span>Login / Signup</span>
          </button>
        )}
      </div>
    </motion.div>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        className={`navbar ${scrolled ? 'scrolled' : ''} ${location.pathname === '/' ? 'transparent' : ''}`}
        elevation={scrolled ? 4 : 0}
      >
        <Toolbar className="toolbar container">
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              className="menu-btn"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">
              <img src="/logo.png" alt="FoodDelivery Pro" />
              {!isMobile && <span>FoodDelivery Pro</span>}
            </Link>
          </motion.div>

          {/* Location - Desktop */}
          {!isMobile && (
            <motion.div 
              className="location-selector"
              whileHover={{ scale: 1.02 }}
            >
              <LocationOn className="location-icon" />
              <div className="location-text">
                <span className="location-label">Deliver to</span>
                <div className="location-value">
                  <strong>Current Location</strong>
                  <KeyboardArrowDown />
                </div>
              </div>
            </motion.div>
          )}

          {/* Search Bar - Desktop */}
          {!isMobile && (
            <div className="search-container">
              <form onSubmit={handleSearch} className="search-form">
                <Search className="search-icon" />
                <InputBase
                  placeholder="Search for restaurants, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </form>
            </div>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="nav-links">
              {menuItems.slice(0, 3).map((item) => (
                <motion.div
                  key={item.text}
                  whileHover={{ y: -2 }}
                >
                  <Link 
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                  >
                    {item.text}
                  </Link>
                </motion.div>
              ))}
            </nav>
          )}

          {/* Right Actions */}
          <div className="nav-actions">
            {/* Mobile Search */}
            {isMobile && (
              <IconButton 
                className="action-btn"
                onClick={() => setSearchOpen(true)}
              >
                <Search />
              </IconButton>
            )}

            {/* Theme Toggle */}
            <IconButton 
              className="action-btn"
              onClick={() => dispatch(toggleTheme())}
            >
              {currentTheme === 'light' ? <DarkMode /> : <LightMode />}
            </IconButton>

            {/* Notifications */}
            {isAuthenticated && (
              <IconButton className="action-btn">
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            )}

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                className="cart-btn"
                onClick={() => navigate('/cart')}
              >
                <Badge badgeContent={cart.totalItems} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </motion.div>

            {/* Profile */}
            {isAuthenticated ? (
              <motion.div whileHover={{ scale: 1.05 }}>
                <IconButton
                  onClick={handleProfileMenuOpen}
                  className="profile-btn"
                >
                  <Avatar src={user?.avatar} className="nav-avatar">
                    {user?.name?.charAt(0)}
                  </Avatar>
                </IconButton>
              </motion.div>
            ) : (
              <motion.button
                className="login-btn"
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            )}

            {/* Profile Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              className="profile-menu"
              PaperProps={{
                className: 'profile-menu-paper'
              }}
            >
              <div className="menu-user-info">
                <Avatar src={user?.avatar}>{user?.name?.charAt(0)}</Avatar>
                <div>
                  <h4>{user?.name}</h4>
                  <p>{user?.email}</p>
                </div>
              </div>
              <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
                <Person /> Profile
              </MenuItem>
              <MenuItem onClick={() => { navigate('/orders'); handleMenuClose(); }}>
                <Receipt /> My Orders
              </MenuItem>
              <MenuItem onClick={() => { navigate('/favorites'); handleMenuClose(); }}>
                <Favorite /> Favorites
              </MenuItem>
              <MenuItem onClick={handleLogout} className="logout-item">
                <ExitToApp /> Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        className="mobile-drawer-container"
      >
        {drawer}
      </Drawer>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            className="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="search-overlay-content">
              <form onSubmit={handleSearch} className="mobile-search-form">
                <Search />
                <input
                  type="text"
                  placeholder="Search restaurants, dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <IconButton onClick={() => setSearchOpen(false)}>
                  <Close />
                </IconButton>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomerNavbar;