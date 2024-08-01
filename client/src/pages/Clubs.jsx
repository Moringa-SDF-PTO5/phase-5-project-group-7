import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchClubs } from '../features/clubs/clubSlice';
import '../styles/Clubs.css';

const Clubs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const clubs = useSelector((state) => state.clubs.clubs);
    const loading = useSelector((state) => state.clubs.loading);
    const error = useSelector((state) => state.clubs.error);

    useEffect(() => {
        const loadClubs = async () => {
            try {
                await dispatch(fetchClubs()).unwrap();
            } catch (err) {
                if (err.message === 'Unauthenticated') {
                    navigate('/login');
                }
            }
        };
        loadClubs();
    }, [dispatch, navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="clubs-container">
            <h2>Clubs</h2>
            <div className="create-club-button">
                <Link to="/create-club">Create a New Club</Link>
            </div>
            <ul className="clubs-list">
                {clubs.length > 0 ? (
                    clubs.map((club) => (
                        <li key={club.id}>
                            <Link to={`/clubs/${club.id}`}>{club.name}</Link>
                        </li>
                    ))
                ) : (
                    <li>No clubs available</li>
                )}
            </ul>
        </div>
    );
};

export default Clubs;
