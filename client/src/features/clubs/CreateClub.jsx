import React, { useState } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

const CreateClub = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const history = useHistory();

    const handleCreateClub = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/club', { name, description, genre });
            alert(response.data.msg);
            history.push('/clubs'); // Redirect to clubs page after creation
        } catch (error) {
            alert(error.response.data.msg);
        }
    };

    return (
        <form onSubmit={handleCreateClub}>
            <h2>Create Club</h2>
            <input type="text" placeholder="Club Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
            <button type="submit">Create Club</button>
        </form>
    );
};

export default CreateClub;
