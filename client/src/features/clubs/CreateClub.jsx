import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { createClub } from './clubSlice';

const CreateClub = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createClub({ name, description })).unwrap();
            navigate('/clubs'); // Navigate to the clubs page or any other page after successful club creation
        } catch (err) {
            setError('Failed to create club. Please check your details and try again.');
        }
    };

    return (
        <div>
            <h2>Create Club</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
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
                {error && <p>{error}</p>}
                <button type="submit">Create Club</button>
            </form>
        </div>
    );
};

export default CreateClub;
