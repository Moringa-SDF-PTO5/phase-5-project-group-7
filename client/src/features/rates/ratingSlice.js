import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const rateItem = createAsyncThunk('ratings/rateItem', async (ratingData) => {
    const response = await api.post('/rate', ratingData);
    return response.data;
});

const ratingSlice = createSlice({
    name: 'ratings',
    initialState: {
        ratings: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(rateItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(rateItem.fulfilled, (state, action) => {
                state.loading = false;
                state.ratings.push(action.payload);
            })
            .addCase(rateItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default ratingSlice.reducer;
