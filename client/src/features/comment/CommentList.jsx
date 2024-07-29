import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await api.get(`/post/${postId}/comments`);
            setComments(response.data);
        };
        fetchComments();
    }, [postId]);

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
