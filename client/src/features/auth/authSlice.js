import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Define the async thunks for user actions
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (updatedData) => {
    const response = await api.put('/user/profile', updatedData);
    return response.data;
  }
);

export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async () => {
  const response = await api.get('/user/profile');
  return response.data;
});

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
});

// Define synchronous logout action
export const logout = () => {
  return (dispatch) => {
    sessionStorage.removeItem('token'); // Clear the token on logout
    dispatch({ type: 'auth/logout' }); // Optional: dispatch an action to update the store
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      sessionStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        sessionStorage.setItem('token', action.payload.token); // Store the token
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        sessionStorage.setItem('token', action.payload.token); // Store the token
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout: logoutAction } = authSlice.actions;
export default authSlice.reducer;
