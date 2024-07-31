import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import movieReducer from '../features/movies/movieSlice';
import tvShowReducer from '../features/tvShows/tvShowSlice';
import clubReducer from '../features/clubs/clubSlice';
import postReducer from '/home/irene/Development/code/flask2/project/phase-5-project-group-7/client/src/features/posts/postsSlice.js';
import ratingReducer from '/home/irene/Development/code/flask2/project/phase-5-project-group-7/client/src/features/rates/ratingSlice.js';
import notificationReducer from '../features/notifications/notificationSlice';
import watchlistReducer from '/home/irene/Development/code/flask2/project/phase-5-project-group-7/client/src/features/watchlist/watchlistSlice.js'; // Assuming you have a watchlistSlice

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
