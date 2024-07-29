import React from 'react';
import MovieList from '../movies/MovieList';
import TVShowList from '../tvShows/TVShowList';

const Discover = () => {
    return (
        <div>
            <h1>Discover Movies and TV Shows</h1>
            <MovieList />
            <TVShowList />
        </div>
    );
};

export default Discover;
