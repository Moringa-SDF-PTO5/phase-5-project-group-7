import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies, fetchMovieById } from '../../services/api';

export const getMovies = createAsyncThunk('movies/getMovies', async () => {
  const response = await fetchMovies();
  return response.data;
});

export const getMovieById = createAsyncThunk('movies/getMovieById', async (id) => {
  const response = await fetchMovieById(id);
  return response.data;
});
export const getMovieDetails = createAsyncThunk('movies/getMovieDetails', async (id) => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    movie: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getMovieById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movie = action.payload;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.currentMovie = action.payload;
      })
      .addCase(getMovieById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
