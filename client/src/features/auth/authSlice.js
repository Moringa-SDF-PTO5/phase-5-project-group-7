import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const userLogin = createAsyncThunk('auth/login', async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
});

export const userRegister = createAsyncThunk('auth/register', async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
});

export const getUserProfile = createAsyncThunk('auth/getProfile', async () => {
  const response = await api.get('/profile');
  return response.data;
});

export const updateUserProfile = createAsyncThunk('auth/updateProfile', async (profileData) => {
  const response = await api.put('/profile', profileData);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      });
  },
});

export default authSlice.reducer;
