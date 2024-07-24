import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch all clubs
export const getClubs = createAsyncThunk('clubs/getClubs', async () => {
  const response = await api.get('/clubs');
  return response.data;
});

// Fetch a specific club by ID
export const getClubById = createAsyncThunk('clubs/getClubById',
   async (id) => {
  const response = await api.get(`/club/${id}`);
  return response.data;
});

// Create a new club
export const createClub = createAsyncThunk('clubs/createClub',
   async (clubData) => {
  const response = await api.post('/club', clubData);
  return response.data;
});

// Fetch posts for a specific club
export const getClubPosts = createAsyncThunk('clubs/getClubPosts',
   async (clubId) => {
  const response = await api.get(`/club/${clubId}/posts`);
  return response.data;
});

const clubsSlice = createSlice({
  name: 'clubs',
  initialState: {
    clubs: [],
    currentClub: null,
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getClubs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getClubs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.clubs = action.payload;
            })
            .addCase(getClubs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getClubById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getClubById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentClub = action.payload;
            })
            .addCase(getClubById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createClub.fulfilled, (state, action) => {
                state.clubs.push(action.payload);
            })
            .addCase(getClubPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            });
            
    },
});

export default clubsSlice.reducer;