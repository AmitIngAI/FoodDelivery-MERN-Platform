import api from './api';

const restaurantService = {
  // Get all restaurants
  getAllRestaurants: async () => {
    try {
      const response = await api.get('/restaurants');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch restaurants';
    }
  },

  // Get single restaurant
  getRestaurantById: async (id) => {
    try {
      const response = await api.get(`/restaurants/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch restaurant';
    }
  },

  // Create restaurant (Restaurant Owner)
  createRestaurant: async (restaurantData) => {
    try {
      const response = await api.post('/restaurants', restaurantData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create restaurant';
    }
  },

  // Update restaurant
  updateRestaurant: async (id, restaurantData) => {
    try {
      const response = await api.put(`/restaurants/${id}`, restaurantData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update restaurant';
    }
  },
};

export default restaurantService;