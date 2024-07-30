import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../../styles/Clubs.css';

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
                    <li key={club.id}>
                        <Link to={`/clubs/${club.id}`}>{club.name}</Link> {/* Link to the club detail page */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClubList;
