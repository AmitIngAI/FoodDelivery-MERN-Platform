import api from './api';

const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create order';
    }
  },

  // Get user orders
  getUserOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch orders';
    }
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    try {
      const response = await api.put(`/orders/${id}`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update order';
    }
  },

  // Update full order
  updateOrder: async (id, orderData) => {
    try {
      const response = await api.put(`/orders/${id}`, orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update order';
    }
  },
};

export default orderService;