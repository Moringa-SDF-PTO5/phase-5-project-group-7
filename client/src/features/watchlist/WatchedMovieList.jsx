import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWatchedMovies } from './watchlistSlice';

const WatchedMovieList = () => {
    const dispatch = useDispatch();
    const watchedMovies = useSelector((state) => state.watchlist.watchedMovies);
    const loading = useSelector((state) => state.watchlist.loading);
    const error = useSelector((state) => state.watchlist.error);

    useEffect(() => {
        dispatch(fetchWatchedMovies());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Watched Movies</h2>
            <ul>
                {watchedMovies.map(movie => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default WatchedMovieList;
