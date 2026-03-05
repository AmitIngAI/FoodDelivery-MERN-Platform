import api from './api';

const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('role', response.data.role);
      }
      return response.data;
    } catch (error) {
      const errorData = {
        message: error.response?.data?.message || 'Registration failed',
        errorType: error.response?.data?.errorType || 'unknown'
      };
      throw errorData;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('role', response.data.role);
      }
      return response.data;
    } catch (error) {
      const errorData = {
        message: error.response?.data?.message || 'Login failed',
        errorType: error.response?.data?.errorType || 'unknown'
      };
      throw errorData;
    }
  },

  // Check if email exists
  checkEmail: async (email) => {
    try {
      const response = await api.post('/auth/check-email', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error checking email';
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;