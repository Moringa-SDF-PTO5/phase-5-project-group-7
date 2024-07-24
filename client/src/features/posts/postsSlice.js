import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch all posts
export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const response = await api.get('/posts');
  return response.data;
});

export const getPostDetails = createAsyncThunk('posts/getPostDetails', async (id) => {
  const response = await api.get(`/post/${id}`);
  return response.data;
});

// Create a new post
export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
  const response = await api.post('/post', postData);
  return response.data;
});

// Fetch a specific post by ID
export const getPostById = createAsyncThunk('posts/getPostById', async (postId) => {
  const response = await api.get(`/post/${postId}`);
  return response.data;
});

export const createComment = createAsyncThunk('posts/createComment', async ({ postId, content }) => {
  const response = await api.post(`/post/${postId}/comment`, { content });
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    currentPost: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(getPostDetails.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      });
  },
});

export default postsSlice.reducer;
