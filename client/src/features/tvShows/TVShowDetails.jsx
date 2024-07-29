import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTVShowDetail } from './tvShowSlice';

const TVShowDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const tvShow = useSelector((state) => state.tvShows.selectedTVShow);
    const loading = useSelector((state) => state.tvShows.loading);
    const error = useSelector((state) => state.tvShows.error);

    useEffect(() => {
        dispatch(fetchTVShowDetail(id));
    }, [dispatch, id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>{tvShow.name}</h2>
            <p>{tvShow.overview}</p>
            <img src={tvShow.poster_path} alt={tvShow.name} />
        </div>
    );
};

export default TVShowDetail;
