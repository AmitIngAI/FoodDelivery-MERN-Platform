import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import customerReducer from './slices/customerSlice';
import restaurantReducer from './slices/restaurantSlice';
import deliveryReducer from './slices/deliverySlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    restaurant: restaurantReducer,
    delivery: deliveryReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});