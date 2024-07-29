// pages/Discover.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IMAGE_URL_W300 } from '../services/constants';
import Card from '../components/Card';

const Discover = () => {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieResponse = await axios.get('http://localhost:5000/discover/movies');
                const tvShowResponse = await axios.get('http://localhost:5000/discover/tv');

                setMovies(movieResponse.data.results || []);
                setTvShows(tvShowResponse.data.results || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCardClick = (item) => {
        setSelectedItem(item);
        setShowDetails(true);
    };

    const handleBackClick = () => {
        setShowDetails(false);
        setSelectedItem(null);
    };

    return (
        <div>
            {showDetails && selectedItem ? (
                <div className="details">
                    <button onClick={handleBackClick}>Back</button>
                    <h2>{selectedItem.title || selectedItem.name}</h2>
                    <img
                        src={`${IMAGE_URL_W300}${selectedItem.poster_path}`}
                        alt={selectedItem.title || selectedItem.name}
                    />
                    <p>{selectedItem.overview}</p>
                    <p>Release Date: {selectedItem.release_date || selectedItem.first_air_date}</p>
                </div>
            ) : (
                <>
                    <h2>Discover Movies</h2>
                    <div className="movies-list">
                        {Array.isArray(movies) && movies.map(movie => (
                            <Card
                                key={movie.id}
                                item={movie}
                                type="movie"
                                onClick={handleCardClick}
                            />
                        ))}
                    </div>

                    <h2>Discover TV Shows</h2>
                    <div className="tvshows-list">
                        {Array.isArray(tvShows) && tvShows.map(show => (
                            <Card
                                key={show.id}
                                item={show}
                                type="tv"
                                onClick={handleCardClick}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Discover;
