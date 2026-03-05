import React from 'react';
import CustomerNavbar from '../components/common/Navbar/CustomerNavbar';
import Footer from '../components/common/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerLayout = ({ children }) => {
  return (
    <div className="customer-layout">
      <CustomerNavbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
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
      />
    </div>
  );
};

export default CustomerLayout;