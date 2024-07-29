import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api'; // Make sure your API service is correctly set up

// Async thunk to handle search functionality
export const searchItems = createAsyncThunk('search/searchItems', async (query) => {
    const response = await api.get(`/search?q=${query}`);
    return response.data;
});

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: '',
        results: [],
        loading: false,
        error: null,
    },
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchItems.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(searchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setQuery } = searchSlice.actions;

export default searchSlice.reducer;
