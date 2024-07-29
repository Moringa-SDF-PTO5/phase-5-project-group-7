import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await api.get('/discover/movies');
    return response.data;
});

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default movieSlice.reducer;
