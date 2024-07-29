import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const TVShowList = () => {
    const [tvShows, setTVShows] = useState([]);

    useEffect(() => {
        const fetchTVShows = async () => {
            const response = await api.get('/discover/tv');
            setTVShows(response.data);
        };
        fetchTVShows();
    }, []);

    return (
        <div>
            <h2>TV Shows</h2>
            <ul>
                {tvShows.map(show => (
                    <li key={show.id}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TVShowList;
