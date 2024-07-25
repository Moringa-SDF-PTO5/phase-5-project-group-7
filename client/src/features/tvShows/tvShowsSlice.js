import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTVShows, fetchTVShowById } from '../../services/api';

// Fetch all TV shows
export const getTVShows = createAsyncThunk('tvShows/getTVShows', async () => {
  const response = await fetchTVShows(); // Adjust the endpoint as necessary
  return response.data;
});

export const getTVShowById = createAsyncThunk('tvShows/getTVShowById', async (id) => {
  const response = await fetchTVShowById(id);
  return response.data;
});

// Fetch TV show details by ID
export const getTVShowDetails = createAsyncThunk('tvShows/getTVShowDetails', async (id) => {
  const response = await api.get(`/tvShow/${id}`); // Adjust the endpoint as necessary
  return response.data;
});

const tvShowsSlice = createSlice({
  name: 'tvShows',
  initialState: {
    tvShows: [],
    tvShow: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTVShows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTVShows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tvShows = action.payload;
      })
      .addCase(getTVShows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getTVShowById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTVShowById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tvShow = action.payload;
      })
      .addCase(getTVShowById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getTVShowDetails.fulfilled, (state, action) => {
        state.currentTVShow = action.payload;
      });
  },
});

export default tvShowsSlice.reducer;
