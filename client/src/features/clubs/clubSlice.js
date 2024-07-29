import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchClubDetails = createAsyncThunk('clubs/fetchClubDetails', async (clubId) => {
    const response = await api.get(`/club/${clubId}`);
    return response.data;
});

const clubSlice = createSlice({
    name: 'clubs',
    initialState: {
        selectedClub: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClubDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClubDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedClub = action.payload;
            })
            .addCase(fetchClubDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default clubSlice.reducer;
