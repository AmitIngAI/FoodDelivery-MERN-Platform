import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import DeliverySidebar from '../components/delivery/Sidebar/DeliverySidebar';
import './DeliveryLayout.css';

const DeliveryLayout = ({ children }) => {
  const { isAuthenticated, role } = useSelector(state => state.auth);

  if (!isAuthenticated || role !== 'delivery') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="delivery-layout">
      <DeliverySidebar />
      <main className="delivery-main">
        {children}
      </main>
    </div>
  );
};

export default DeliveryLayout;