import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import '../../styles/Clubs.css';

const useClubs = () => {
    const [clubs, setClubs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await api.get('/clubs');
                if (response.data && Array.isArray(response.data)) {
                    setClubs(response.data);
                } else {
                    setError('Unexpected response format');
                }
            } catch (err) {
                setError('Failed to fetch clubs');
                console.error('Fetch clubs error:', err);
            }
        };
        fetchClubs();
    }, []);

    return { clubs, error };
};

const ClubList = () => {
    const { clubs, error } = useClubs();

    if (error) return <div>Error: {error}</div>;
    if (clubs.length === 0) return <div>No Clubs Found</div>;

    return (
        <div>
            <h2>Clubs</h2>
            <ul>
                {clubs.map(club => (
                    <li key={club.id}>
                        <Link to={`/clubs/${club.id}`}>{club.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClubList;