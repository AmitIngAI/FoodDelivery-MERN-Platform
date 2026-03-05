import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Driver Info
  driver: {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh@delivery.com',
    phone: '+91 9876543210',
    avatar: 'https://i.pravatar.cc/200?img=12',
    vehicle: 'Bike',
    vehicleNumber: 'KA-01-AB-1234',
    rating: 4.8,
    totalDeliveries: 1250,
    joinedDate: '2023-01-15',
  },
  
  // Status
  isOnline: false,
  isOnDelivery: false,
  
  // Current Delivery
  currentDelivery: null,
  
  // Orders
  availableOrders: [],
  activeOrders: [],
  completedOrders: [],
  
  // Earnings
  earnings: {
    today: 850,
    thisWeek: 5200,
    thisMonth: 22500,
    total: 125000,
    pending: 1200,
  },
  
  earningsHistory: [
    { date: '2024-01-16', amount: 850, orders: 8, tips: 120 },
    { date: '2024-01-15', amount: 920, orders: 9, tips: 150 },
    { date: '2024-01-14', amount: 780, orders: 7, tips: 100 },
    { date: '2024-01-13', amount: 1100, orders: 11, tips: 200 },
    { date: '2024-01-12', amount: 650, orders: 6, tips: 80 },
    { date: '2024-01-11', amount: 900, orders: 8, tips: 130 },
    { date: '2024-01-10', amount: 1000, orders: 10, tips: 180 },
  ],
  
  // Stats
  stats: {
    todayOrders: 8,
    todayDistance: 45,
    avgDeliveryTime: 28,
    acceptanceRate: 92,
    completionRate: 98,
  },
  
  // Location
  currentLocation: {
    lat: 12.9716,
    lng: 77.5946,
  },
  
  // Loading
  loading: false,
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    // Online Status
    toggleOnlineStatus: (state) => {
      state.isOnline = !state.isOnline;
    },
    
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
    },
    
    // Orders
    setAvailableOrders: (state, action) => {
      state.availableOrders = action.payload;
    },
    
    acceptOrder: (state, action) => {
      const order = state.availableOrders.find(o => o.id === action.payload);
      if (order) {
        state.availableOrders = state.availableOrders.filter(o => o.id !== action.payload);
        state.activeOrders.push({ ...order, status: 'accepted' });
        state.currentDelivery = { ...order, status: 'accepted' };
        state.isOnDelivery = true;
      }
    },
    
    rejectOrder: (state, action) => {
      state.availableOrders = state.availableOrders.filter(o => o.id !== action.payload);
    },
    
    updateDeliveryStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.activeOrders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
        if (state.currentDelivery?.id === orderId) {
          state.currentDelivery.status = status;
        }
      }
    },
    
    completeDelivery: (state, action) => {
      const orderId = action.payload;
      const order = state.activeOrders.find(o => o.id === orderId);
      if (order) {
        state.activeOrders = state.activeOrders.filter(o => o.id !== orderId);
        state.completedOrders.unshift({ ...order, status: 'delivered', deliveredAt: new Date().toISOString() });
        state.currentDelivery = null;
        state.isOnDelivery = false;
        state.stats.todayOrders += 1;
        state.earnings.today += order.deliveryFee || 50;
      }
    },
    
    setCurrentDelivery: (state, action) => {
      state.currentDelivery = action.payload;
      state.isOnDelivery = !!action.payload;
    },
    
    // Location
    updateLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    
    // Driver Profile
    updateDriverProfile: (state, action) => {
      state.driver = { ...state.driver, ...action.payload };
    },
    
    // Loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  toggleOnlineStatus,
  setOnlineStatus,
  setAvailableOrders,
  acceptOrder,
  rejectOrder,
  updateDeliveryStatus,
  completeDelivery,
  setCurrentDelivery,
  updateLocation,
  updateDriverProfile,
  setLoading,
} = deliverySlice.actions;

export default deliverySlice.reducer;