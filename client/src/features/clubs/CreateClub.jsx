import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Updated import
import { createClub } from './clubSlice';

const CreateClub = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Updated from useHistory
    const [clubName, setClubName] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [error, setError] = useState('');
    const userId = sessionStorage.getItem('user_id');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        console.log('Token:', token);
        console.log('User ID:', userId);
        if (!userId) {
            setError('User not logged in');
            return;
        }

        try {
            const resultAction = await dispatch(createClub({ user_id: userId, name: clubName, description, genre })).unwrap();
            navigate(`/clubs/${resultAction.id}`); // Adjust according to your response
        } catch (err) {
            setError('Failed to create club');
            console.error('Create club error:', err);
        }
    };

    return (
        <div>
            <h2>Create Club</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Club Name:</label>
                    <input
                        type="text"
                        value={clubName}
                        onChange={(e) => setClubName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Genre:</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Create Club</button>
            </form>
        </div>
    );
};

export default CreateClub;
