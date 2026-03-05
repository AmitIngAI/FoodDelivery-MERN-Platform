import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Cart
  cart: {
    items: JSON.parse(localStorage.getItem('cart')) || [],
    restaurant: JSON.parse(localStorage.getItem('cartRestaurant')) || null,
    totalAmount: 0,
    totalItems: 0,
    appliedPromo: null,
    discount: 0,
  },
  
  // Restaurants
  restaurants: [],
  selectedRestaurant: null,
  filters: {
    cuisine: 'All',
    sortBy: 'relevance',
    priceRange: [0, 1000],
    rating: 0,
    vegOnly: false,
    freeDelivery: false,
  },
  searchQuery: '',
  
  // Orders
  orders: [],
  currentOrder: null,
  
  // Favorites
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  
  // Addresses
  addresses: JSON.parse(localStorage.getItem('addresses')) || [
    {
      id: 1,
      name: 'Home',
      address: '123, MG Road, Koramangala',
      city: 'Bangalore',
      pincode: '560034',
      phone: '+91 9876543210',
      type: 'home',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Office',
      address: '456, Tech Park, Whitefield',
      city: 'Bangalore',
      pincode: '560066',
      phone: '+91 9876543210',
      type: 'work',
      isDefault: false,
    },
  ],
  selectedAddress: null,
  
  // Loading states
  loading: false,
};

const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalItems, totalAmount };
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // Cart Actions
    addToCart: (state, action) => {
      const { item, restaurant } = action.payload;
      
      // Check if adding from different restaurant
      if (state.cart.restaurant && state.cart.restaurant.id !== restaurant.id) {
        // Clear cart if from different restaurant
        state.cart.items = [];
        state.cart.restaurant = null;
      }

      const existingItem = state.cart.items.find(i => i.id === item.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.items.push({ ...item, quantity: 1 });
      }

      state.cart.restaurant = restaurant;
      const totals = calculateTotals(state.cart.items);
      state.cart.totalItems = totals.totalItems;
      state.cart.totalAmount = totals.totalAmount;

      localStorage.setItem('cart', JSON.stringify(state.cart.items));
      localStorage.setItem('cartRestaurant', JSON.stringify(state.cart.restaurant));
    },
    
    removeFromCart: (state, action) => {
      state.cart.items = state.cart.items.filter(item => item.id !== action.payload);
      
      if (state.cart.items.length === 0) {
        state.cart.restaurant = null;
        localStorage.removeItem('cartRestaurant');
      }

      const totals = calculateTotals(state.cart.items);
      state.cart.totalItems = totals.totalItems;
      state.cart.totalAmount = totals.totalAmount;

      localStorage.setItem('cart', JSON.stringify(state.cart.items));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.items.find(i => i.id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.cart.items = state.cart.items.filter(i => i.id !== id);
        } else {
          item.quantity = quantity;
        }

        if (state.cart.items.length === 0) {
          state.cart.restaurant = null;
          localStorage.removeItem('cartRestaurant');
        }

        const totals = calculateTotals(state.cart.items);
        state.cart.totalItems = totals.totalItems;
        state.cart.totalAmount = totals.totalAmount;

        localStorage.setItem('cart', JSON.stringify(state.cart.items));
      }
    },

    clearCart: (state) => {
      state.cart.items = [];
      state.cart.restaurant = null;
      state.cart.totalAmount = 0;
      state.cart.totalItems = 0;
      state.cart.appliedPromo = null;
      state.cart.discount = 0;
      localStorage.removeItem('cart');
      localStorage.removeItem('cartRestaurant');
    },

    applyPromoCode: (state, action) => {
      const { code, discount, type, maxDiscount } = action.payload;
      state.cart.appliedPromo = code;
      
      if (type === 'percentage') {
        const discountAmount = (state.cart.totalAmount * discount / 100);
        state.cart.discount = Math.min(discountAmount, maxDiscount);
      } else if (type === 'flat') {
        state.cart.discount = discount;
      } else if (type === 'freeDelivery') {
        state.cart.discount = 0; // Handle in checkout
      }
    },

    removePromoCode: (state) => {
      state.cart.appliedPromo = null;
      state.cart.discount = 0;
    },

    // Restaurant Actions
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },

    setSelectedRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    },

    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    // Order Actions
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
      state.currentOrder = action.payload;
    },

    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },

    updateOrderStatus: (state, action) => {
      const { orderId, status, driverLocation } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
        if (driverLocation) {
          order.driverLocation = driverLocation;
        }
      }
      if (state.currentOrder?.id === orderId) {
        state.currentOrder.status = status;
        if (driverLocation) {
          state.currentOrder.driverLocation = driverLocation;
        }
      }
    },

    // Favorites Actions
    toggleFavorite: (state, action) => {
      const restaurantId = action.payload;
      const index = state.favorites.indexOf(restaurantId);
      
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(restaurantId);
      }
      
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },

    // Address Actions
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
      localStorage.setItem('addresses', JSON.stringify(state.addresses));
    },

    updateAddress: (state, action) => {
      const index = state.addresses.findIndex(a => a.id === action.payload.id);
      if (index > -1) {
        state.addresses[index] = action.payload;
        localStorage.setItem('addresses', JSON.stringify(state.addresses));
      }
    },

    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter(a => a.id !== action.payload);
      localStorage.setItem('addresses', JSON.stringify(state.addresses));
    },

    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyPromoCode,
  removePromoCode,
  setRestaurants,
  setSelectedRestaurant,
  setFilters,
  setSearchQuery,
  setOrders,
  addOrder,
  setCurrentOrder,
  updateOrderStatus,
  toggleFavorite,
  addAddress,
  updateAddress,
  deleteAddress,
  setSelectedAddress,
  setLoading,
} = customerSlice.actions;

export default customerSlice.reducer;