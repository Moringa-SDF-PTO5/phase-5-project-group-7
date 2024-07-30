import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Changed useHistory to useNavigate
import { fetchClubs } from '../features/clubs/clubSlice'; // Import the thunk for fetching clubs
import '../styles/Clubs.css'; // Import CSS for styling

const Clubs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Changed useHistory to useNavigate
    const clubs = useSelector((state) => state.clubs.clubs);
    const loading = useSelector((state) => state.clubs.loading);
    const error = useSelector((state) => state.clubs.error);

    useEffect(() => {
        async function loadClubs() {
            try {
                await dispatch(fetchClubs()).unwrap();
            } catch (err) {
                if (err.message === 'Unauthenticated') {
                    navigate('/login'); // Changed history.push to navigate
                }
            }
        }
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
                {clubs.map((club) => (
                    <li key={club.id}>
                        <Link to={`/club/${club.id}`}>{club.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Clubs;
