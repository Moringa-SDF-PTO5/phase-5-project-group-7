import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchTVShows = createAsyncThunk('tvShows/fetchTVShows', async () => {
    const response = await api.get('/discover/tv');
    return response.data;
});

const tvShowSlice = createSlice({
    name: 'tvShows',
    initialState: {
        tvShows: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTVShows.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTVShows.fulfilled, (state, action) => {
                state.loading = false;
                state.tvShows = action.payload;
            })
            .addCase(fetchTVShows.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default tvShowSlice.reducer;
