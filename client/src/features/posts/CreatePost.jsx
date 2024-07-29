import React, { useState } from 'react';
import api from '../../services/api';

const CreatePost = ({ clubId }) => {
    const [content, setContent] = useState('');

    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/post', { content, club_id: clubId });
            alert(response.data.msg);
        } catch (error) {
            alert(error.response.data.msg);
        }
    };

    return (
        <form onSubmit={handleCreatePost}>
            <h2>Create Post</h2>
            <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePost;
