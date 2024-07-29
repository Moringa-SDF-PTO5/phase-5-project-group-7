import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Define the async thunks for club actions
export const fetchClubDetail = createAsyncThunk('clubs/fetchClubDetail', async (clubId) => {
  const response = await api.get(`/clubs/${clubId}`);
  return response.data;
});

export const createClub = createAsyncThunk('clubs/createClub', async (clubData) => {
  const response = await api.post('/clubs', clubData);
  return response.data;
});

export const updateClub = createAsyncThunk('clubs/updateClub', async (updatedClub) => {
  const response = await api.put(`/clubs/${updatedClub.id}`, updatedClub);
  return response.data;
});

export const deleteClub = createAsyncThunk('clubs/deleteClub', async (clubId) => {
  await api.delete(`/clubs/${clubId}`);
  return clubId; // Return the id to filter out the deleted club
});

const clubSlice = createSlice({
  name: 'clubs',
  initialState: {
    clubs: [],
    selectedClub: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClubDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedClub = action.payload;
      })
      .addCase(fetchClubDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createClub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClub.fulfilled, (state, action) => {
        state.loading = false;
        state.clubs.push(action.payload);
      })
      .addCase(createClub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateClub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClub.fulfilled, (state, action) => {
        state.loading = false;
        const updatedClubIndex = state.clubs.findIndex((club) => club.id === action.payload.id);
        if (updatedClubIndex !== -1) {
          state.clubs[updatedClubIndex] = action.payload;
        }
      })
      .addCase(updateClub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteClub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClub.fulfilled, (state, action) => {
        state.loading = false;
        state.clubs = state.clubs.filter((club) => club.id !== action.payload);
      })
      .addCase(deleteClub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default clubSlice.reducer;
