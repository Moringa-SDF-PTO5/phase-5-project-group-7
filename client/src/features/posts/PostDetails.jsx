import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPostDetails } from './postSlice';
import CommentList from '../comments/CommentList';
import CreateComment from '../comments/CreateComment';

const PostDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.posts.selectedPost);
    const loading = useSelector((state) => state.posts.loading);
    const error = useSelector((state) => state.posts.error);

    useEffect(() => {
        dispatch(fetchPostDetails(id));
    }, [dispatch, id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Author: {post.author.username}</p>
            <p>Club: {post.club.name}</p>

            <h3>Comments</h3>
            <CommentList postId={post.id} />
            <CreateComment postId={post.id} />
        </div>
    );
};

export default PostDetail;
