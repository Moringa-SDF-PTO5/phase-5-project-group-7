import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { search } from '../../services/api';

export const performSearch = createAsyncThunk('search/performSearch', async (query) => {
  const response = await search(query);
  return response.data;
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: {
      movies: [],
      tvShows: [],
      users: [],
      clubs: [],
    },
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
