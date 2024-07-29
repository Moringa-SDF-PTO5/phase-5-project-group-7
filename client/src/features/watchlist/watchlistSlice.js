import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchWatchedMovies = createAsyncThunk('watchlist/fetchWatchedMovies', async () => {
    const response = await api.get('/watched/movies');
    return response.data;
});

export const fetchWatchedTVShows = createAsyncThunk('watchlist/fetchWatchedTVShows', async () => {
    const response = await api.get('/watched/tvshows');
    return response.data;
});

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: {
        watchedMovies: [],
        watchedTVShows: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWatchedMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWatchedMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.watchedMovies = action.payload;
            })
            .addCase(fetchWatchedMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchWatchedTVShows.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWatchedTVShows.fulfilled, (state, action) => {
                state.loading = false;
                state.watchedTVShows = action.payload;
            })
            .addCase(fetchWatchedTVShows.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default watchlistSlice.reducer;
