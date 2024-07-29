import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (clubId) => {
    const response = await api.get(`/club/${clubId}/posts`);
    return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
    const response = await api.post('/post', postData);
    return response.data;
});

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            });
    },
});

export default postSlice.reducer;
