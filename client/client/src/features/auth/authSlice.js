
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Action to login user
export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const response = await api.post('/api/users/login', formData);
      
      console.log('Login response:', response.data);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Action to register user
export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const response = await api.post('/api/users/register', formData);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('userInfo')) || null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    logout: (state) => {
      localStorage.removeItem('userInfo');
      state.user = null;
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'Login failed';
        state.user = null;
      });
  }
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;