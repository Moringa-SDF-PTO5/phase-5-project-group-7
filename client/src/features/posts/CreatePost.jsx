import React, { useState } from 'react';
import api from '../../services/api';

const CreatePost = ({ clubId }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            setError('Post content cannot be empty.');
            return;
        }
        try {
            const response = await api.post('/post', { content, club_id: clubId });
            alert(response.data.msg);
            setContent('');
        } catch (error) {
            setError('Failed to create post.');
        }
    };

    return (
        <form onSubmit={handleCreatePost}>
            <h2>Create Post</h2>
            <textarea 
                placeholder="Content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                required 
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePost;
