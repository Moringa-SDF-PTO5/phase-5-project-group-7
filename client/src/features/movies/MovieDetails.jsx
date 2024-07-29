import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetail } from './movieSlice';

const MovieDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.movies.selectedMovie);
    const loading = useSelector((state) => state.movies.loading);
    const error = useSelector((state) => state.movies.error);

    useEffect(() => {
        dispatch(fetchMovieDetail(id));
    }, [dispatch, id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <img src={movie.poster_path} alt={movie.title} />
        </div>
    );
};

export default MovieDetail;
