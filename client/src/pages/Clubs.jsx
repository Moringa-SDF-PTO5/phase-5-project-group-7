// src/pages/Clubs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Clubs() {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        async function fetchClubs() {
            try {
                const response = await axios.get('/clubs');
                setClubs(response.data);
            } catch (error) {
                console.error('Error fetching clubs:', error);
            }
        }

        fetchClubs();
    }, []);

    return (
        <div>
            <h1>Clubs</h1>
            <ul>
                {clubs.map((club) => (
                    <li key={club.id}>{club.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Clubs;
