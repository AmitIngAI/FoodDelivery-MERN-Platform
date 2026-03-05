import React from 'react';
import RestaurantSidebar from '../components/restaurant/Sidebar/RestaurantSidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RestaurantLayout.css';

const RestaurantLayout = ({ children }) => {
  return (
    <div className="restaurant-layout">
      <RestaurantSidebar />
      <main className="restaurant-main">
        {children}
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default RestaurantLayout;