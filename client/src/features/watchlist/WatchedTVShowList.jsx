import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWatchedTVShows } from './watchlistSlice';

const WatchedTVShowList = () => {
    const dispatch = useDispatch();
    const watchedTVShows = useSelector((state) => state.watchlist.watchedTVShows);
    const loading = useSelector((state) => state.watchlist.loading);
    const error = useSelector((state) => state.watchlist.error);

    useEffect(() => {
        dispatch(fetchWatchedTVShows());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Watched TV Shows</h2>
            <ul>
                {watchedTVShows.map(show => (
                    <li key={show.id}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default WatchedTVShowList;
