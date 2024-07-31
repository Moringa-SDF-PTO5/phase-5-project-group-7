import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await api.get(`/post/${postId}/comments`);
                setComments(response.data);
            } catch (err) {
                setError('Failed to load comments.');
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [postId]);

    if (loading) return <div>Loading comments...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
