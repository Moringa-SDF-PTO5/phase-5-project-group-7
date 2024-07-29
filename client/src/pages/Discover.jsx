import React from 'react';
import MovieList from '/home/btsalwa/class/phase-5-project-group-7/client/src/features/movies/MovieList.jsx';
import TVShowList from '/home/btsalwa/class/phase-5-project-group-7/client/src/features/tvShows/TVShowList.jsx';

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
