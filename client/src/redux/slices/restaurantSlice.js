import { createSlice } from '@reduxjs/toolkit';

const mockOrders = [
  {
    id: 'ORD001',
    customer: { name: 'Priya Sharma', phone: '+91 9876543210', avatar: 'https://i.pravatar.cc/100?img=5' },
    items: [
      { name: 'Margherita Pizza', quantity: 2, price: 299 },
      { name: 'Garlic Bread', quantity: 1, price: 149 },
    ],
    totalAmount: 747,
    status: 'pending',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    address: '123, HSR Layout, Bangalore',
    createdAt: new Date(Date.now() - 2 * 60000).toISOString(),
    notes: 'Extra cheese please',
  },
  {
    id: 'ORD002',
    customer: { name: 'Rahul Verma', phone: '+91 9988776655', avatar: 'https://i.pravatar.cc/100?img=12' },
    items: [
      { name: 'Pepperoni Pizza', quantity: 1, price: 399 },
      { name: 'Coca Cola', quantity: 2, price: 60 },
    ],
    totalAmount: 519,
    status: 'preparing',
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    address: '456, Koramangala, Bangalore',
    createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
    notes: '',
  },
  {
    id: 'ORD003',
    customer: { name: 'Ananya Patel', phone: '+91 9123456789', avatar: 'https://i.pravatar.cc/100?img=9' },
    items: [
      { name: 'Pasta Alfredo', quantity: 1, price: 249 },
      { name: 'Chocolate Brownie', quantity: 2, price: 149 },
    ],
    totalAmount: 547,
    status: 'ready',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    address: '789, Indiranagar, Bangalore',
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
    notes: 'No onions',
  },
];

const mockMenuItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh tomatoes and mozzarella',
    category: 'Pizzas',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    isVeg: true,
    isAvailable: true,
    isBestseller: true,
    preparationTime: '20-25 min',
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    description: 'Loaded with spicy pepperoni and extra cheese',
    category: 'Pizzas',
    price: 399,
    originalPrice: 499,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
    isVeg: false,
    isAvailable: true,
    isBestseller: true,
    preparationTime: '25-30 min',
  },
  {
    id: 3,
    name: 'Pasta Alfredo',
    description: 'Creamy white sauce pasta with herbs',
    category: 'Pasta',
    price: 249,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    isVeg: true,
    isAvailable: true,
    isBestseller: false,
    preparationTime: '15-20 min',
  },
  {
    id: 4,
    name: 'Garlic Bread',
    description: 'Crispy garlic bread with cheese',
    category: 'Starters',
    price: 149,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=400',
    isVeg: true,
    isAvailable: true,
    isBestseller: false,
    preparationTime: '10-15 min',
  },
  {
    id: 5,
    name: 'Chocolate Brownie',
    description: 'Warm brownie with vanilla ice cream',
    category: 'Desserts',
    price: 149,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400',
    isVeg: true,
    isAvailable: false,
    isBestseller: true,
    preparationTime: '10-15 min',
  },
];

const initialState = {
  orders: mockOrders,
  activeOrders: mockOrders.filter(o => ['pending', 'preparing', 'ready'].includes(o.status)),
  completedOrders: [],
  
  menu: {
    items: mockMenuItems,
    categories: ['All', 'Pizzas', 'Pasta', 'Starters', 'Desserts', 'Beverages'],
  },
  
  stats: {
    today: {
      orders: 24,
      revenue: 12450,
      avgOrderValue: 518,
      newCustomers: 8,
    },
    weekly: [
      { day: 'Mon', orders: 45, revenue: 18500 },
      { day: 'Tue', orders: 52, revenue: 22000 },
      { day: 'Wed', orders: 38, revenue: 15600 },
      { day: 'Thu', orders: 61, revenue: 25800 },
      { day: 'Fri', orders: 73, revenue: 31200 },
      { day: 'Sat', orders: 89, revenue: 38500 },
      { day: 'Sun', orders: 67, revenue: 28400 },
    ],
    topItems: [
      { name: 'Margherita Pizza', orders: 156, revenue: 46644 },
      { name: 'Pepperoni Pizza', orders: 124, revenue: 49476 },
      { name: 'Pasta Alfredo', orders: 89, revenue: 22161 },
      { name: 'Garlic Bread', orders: 78, revenue: 11622 },
    ],
  },
  
  settings: {
    isOpen: true,
    preparationTime: 30,
    minimumOrder: 200,
    deliveryRadius: 10,
  },
  
  loading: false,
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    // Orders
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
        order.updatedAt = new Date().toISOString();
        
        // Update filtered arrays
        state.activeOrders = state.orders.filter(o => 
          ['pending', 'preparing', 'ready'].includes(o.status)
        );
        state.completedOrders = state.orders.filter(o => 
          ['delivered', 'cancelled'].includes(o.status)
        );
      }
    },

    addNewOrder: (state, action) => {
      state.orders.unshift(action.payload);
      state.activeOrders.unshift(action.payload);
    },

    // Menu
    addMenuItem: (state, action) => {
      state.menu.items.push({
        ...action.payload,
        id: Date.now(),
      });
    },

    updateMenuItem: (state, action) => {
      const index = state.menu.items.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.menu.items[index] = action.payload;
      }
    },

    deleteMenuItem: (state, action) => {
      state.menu.items = state.menu.items.filter(i => i.id !== action.payload);
    },

    toggleItemAvailability: (state, action) => {
      const item = state.menu.items.find(i => i.id === action.payload);
      if (item) {
        item.isAvailable = !item.isAvailable;
      }
    },

    // Settings
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },

    toggleRestaurantStatus: (state) => {
      state.settings.isOpen = !state.settings.isOpen;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  updateOrderStatus,
  addNewOrder,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleItemAvailability,
  updateSettings,
  toggleRestaurantStatus,
  setLoading,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;