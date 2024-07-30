import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { createClub } from './clubSlice';
import '../../styles/CreateClub.css'; 

const CreateClub = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [newClub, setNewClub] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(createClub({ name, description, genre })).unwrap();
            setSuccess('Club created successfully! Redirecting...');
            setNewClub(result);
            setTimeout(() => {
                setShowModal(true); // Show modal with new club details
            }, 2000); // Show success message for 2 seconds
        } catch (err) {
            setError('Failed to create club. Please check your details and try again.');
        }
    };

    return (
        <div className="create-club-container">
            <h2>Create Club</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Genre:</label>
                    <input 
                        type="text" 
                        value={genre} 
                        onChange={(e) => setGenre(e.target.value)} 
                        required 
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type="submit">Create Club</button>
            </form>
            {showModal && newClub && (
                <ClubDetailModal club={newClub} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

// Modal Component
const ClubDetailModal = ({ club, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{club.name}</h2>
                <p>{club.description}</p>
                <p>Genre: {club.genre}</p>
                <button onClick={() => navigate(`/club/${club.id}`)}>Go to Club</button>
            </div>
        </div>
    );
};

export default CreateClub;
