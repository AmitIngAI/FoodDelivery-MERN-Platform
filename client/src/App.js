import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Auth
import Login from './pages/Auth/Login/Login';
import ActiveDelivery from './pages/delivery/ActiveDelivery/ActiveDelivery';

// Layouts
import CustomerLayout from './layouts/CustomerLayout';
import RestaurantLayout from './layouts/RestaurantLayout';
import DeliveryLayout from './layouts/DeliveryLayout';


// Customer Pages
import Home from './pages/customer/Home/Home';
import Restaurants from './pages/customer/Restaurants/Restaurants';
import RestaurantDetails from './pages/customer/RestaurantDetails/RestaurantDetails';
import Cart from './pages/customer/Cart/Cart';
import Checkout from './pages/customer/Checkout/Checkout';
import OrderTracking from './pages/customer/OrderTracking/OrderTracking';
import Orders from './pages/customer/Orders/Orders';
import Profile from './pages/customer/Profile/Profile';
import Favorites from './pages/customer/Favorites/Favorites';


// Restaurant Pages
import RestaurantDashboard from './pages/restaurant/Dashboard/Dashboard';
import RestaurantOrders from './pages/restaurant/Orders/Orders';
import RestaurantMenu from './pages/restaurant/Menu/Menu';
import RestaurantAnalytics from './pages/restaurant/Analytics/Analytics';
import RestaurantSettings from './pages/restaurant/Settings/Settings';
import DeliveryDashboard from './pages/delivery/Dashboard/Dashboard';
import DeliveryOrders from './pages/delivery/Orders/Orders';
import Earnings from './pages/delivery/Earnings/Earnings';
import DeliveryProfile from './pages/delivery/Profile/Profile';

// Protected Route
const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, role: userRole } = useSelector(state => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (role && userRole !== role) {
  if (userRole === 'restaurant') {
    return <Navigate to="/restaurant/dashboard" />;
  } else if (userRole === 'delivery') {
    return <Navigate to="/delivery/dashboard" />;
  } else {
    return <Navigate to="/" />;
  }
}
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Customer Routes */}
      <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
      <Route path="/restaurants" element={<CustomerLayout><Restaurants /></CustomerLayout>} />
      <Route path="/restaurant/:id" element={<CustomerLayout><RestaurantDetails /></CustomerLayout>} />
      <Route path="/cart" element={<CustomerLayout><Cart /></CustomerLayout>} />
      <Route path="/checkout" element={
        <ProtectedRoute role="customer">
          <CustomerLayout><Checkout /></CustomerLayout>
        </ProtectedRoute>
      } />
      <Route path="/order-tracking/:orderId" element={
        <ProtectedRoute role="customer">
          <CustomerLayout><OrderTracking /></CustomerLayout>
        </ProtectedRoute>
      } />
      <Route path="/orders" element={
        <ProtectedRoute role="customer">
          <CustomerLayout><Orders /></CustomerLayout>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute role="customer">
          <CustomerLayout><Profile /></CustomerLayout>
        </ProtectedRoute>
      } />
      <Route path="/favorites" element={
        <ProtectedRoute role="customer">
          <CustomerLayout><Favorites /></CustomerLayout>
        </ProtectedRoute>
      } />

      {/* Restaurant Routes */}
      <Route path="/restaurant/dashboard" element={
        <ProtectedRoute role="restaurant">
          <RestaurantLayout><RestaurantDashboard /></RestaurantLayout>
        </ProtectedRoute>
      } />
      <Route path="/restaurant/orders" element={
        <ProtectedRoute role="restaurant">
          <RestaurantLayout><RestaurantOrders /></RestaurantLayout>
        </ProtectedRoute>
      } />
      <Route path="/restaurant/menu" element={
        <ProtectedRoute role="restaurant">
          <RestaurantLayout><RestaurantMenu /></RestaurantLayout>
        </ProtectedRoute>
      } />
      <Route path="/restaurant/analytics" element={
     <ProtectedRoute role="restaurant">
    <RestaurantLayout><RestaurantAnalytics /></RestaurantLayout>
    </ProtectedRoute>
     } />
      <Route path="/restaurant/settings" element={
        <ProtectedRoute role="restaurant">
          <RestaurantLayout><RestaurantSettings /></RestaurantLayout>
        </ProtectedRoute>
        } />

         <Route path="/delivery/dashboard" element={
          <ProtectedRoute role="delivery">
            <DeliveryLayout><DeliveryDashboard /></DeliveryLayout>
          </ProtectedRoute>
        } />

        <Route path="/delivery/orders" element={
          <ProtectedRoute role="delivery">
            <DeliveryLayout><DeliveryOrders /></DeliveryLayout>
          </ProtectedRoute>
        } />

        <Route path="/delivery/active" element={
          <ProtectedRoute role="delivery">
            <DeliveryLayout><ActiveDelivery /></DeliveryLayout>
          </ProtectedRoute>
        } />

        <Route path="/delivery/earnings" element={
          <ProtectedRoute role="delivery">
            <DeliveryLayout><Earnings /></DeliveryLayout>
          </ProtectedRoute>
        } />

        <Route path="/delivery/profile" element={
          <ProtectedRoute role="delivery">
            <DeliveryLayout><DeliveryProfile /></DeliveryLayout>
          </ProtectedRoute>
        } />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            borderRadius: '12px',
            fontFamily: 'Poppins, sans-serif'
          }}
          />
      </Router>
    </Provider>
  );
}

export default App;