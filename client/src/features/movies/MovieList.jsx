import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from './movieSlice';

const MovieList = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.movies);
    const loading = useSelector((state) => state.movies.loading);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Movies</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
