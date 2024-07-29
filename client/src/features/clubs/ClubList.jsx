import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const ClubList = () => {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        const fetchClubs = async () => {
            const response = await api.get('/clubs');
            setClubs(response.data);
        };
        fetchClubs();
    }, []);

    return (
        <div>
            <h2>Clubs</h2>
            <ul>
                {clubs.map(club => (
                    <li key={club.id}>{club.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ClubList;
