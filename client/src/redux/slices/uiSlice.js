import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  sidebarOpen: false,
  loading: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
      document.documentElement.setAttribute('data-theme', state.theme);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    hideNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { 
  toggleTheme, 
  toggleSidebar, 
  setLoading, 
  showNotification, 
  hideNotification 
} = uiSlice.actions;

export default uiSlice.reducer;