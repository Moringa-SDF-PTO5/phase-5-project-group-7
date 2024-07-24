import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import moviesReducer from '../features/movies/moviesSlice';
import tvShowsReducer from '../features/tvShows/tvShowsSlice';
import clubsReducer from '../features/clubs/clubsSlice';
import postsReducer from '../features/posts/postsSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    tvShows: tvShowsReducer,
    clubs: clubsReducer,
    posts: postsReducer,
    search: searchReducer,
  },
});

export default store;