import api from './api';

const userService = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch profile';
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      // Update local storage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...currentUser, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update profile';
    }
  },

  // Toggle favorite restaurant
  toggleFavorite: async (restaurantId) => {
    try {
      const response = await api.post(`/users/favorites/${restaurantId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update favorites';
    }
  },
};

export default userService;