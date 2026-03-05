import api from './api';

const menuService = {
  // Get menu items for a restaurant
  getMenuByRestaurant: async (restaurantId) => {
    try {
      const response = await api.get(`/menu/restaurant/${restaurantId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch menu';
    }
  },

  // Create menu item (Restaurant Owner)
  createMenuItem: async (menuData) => {
    try {
      const response = await api.post('/menu', menuData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create menu item';
    }
  },

  // Update menu item
  updateMenuItem: async (id, menuData) => {
    try {
      const response = await api.put(`/menu/${id}`, menuData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update menu item';
    }
  },

  // Delete menu item
  deleteMenuItem: async (id) => {
    try {
      const response = await api.delete(`/menu/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete menu item';
    }
  },
};

export default menuService;