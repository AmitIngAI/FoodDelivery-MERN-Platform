import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// ========== ASYNC THUNKS ==========
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const data = await authService.login(credentials);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const data = await authService.register(userData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// ========== INITIAL STATE ==========
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  errorType: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
      
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    clearError: (state) => {
      state.error = null;
      state.errorType = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorType = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
        state.errorType = action.payload?.errorType || 'unknown';
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorType = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Registration failed';
        state.errorType = action.payload?.errorType || 'unknown';
      });
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateUser,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;