import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import movieReducer from '../features/movies/movieSlice';
import tvShowReducer from '../features/tvShows/tvShowSlice';
import clubReducer from '../features/clubs/clubSlice';
import postReducer from '../features/posts/postsSlice';
import ratingReducer from '../features/rates/ratingSlice';
import notificationReducer from '../features/notifications/notificationSlice';
import watchlistReducer from '../features/watchlist/watchlistSlice'; // Assuming you have a watchlistSlice

const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: movieReducer,
        tvShows: tvShowReducer,
        clubs: clubReducer,
        posts: postReducer,
        ratings: ratingReducer,
        notifications: notificationReducer,
        watchlist: watchlistReducer, // Adding watchlist reducer
    },
});

export default store;
