import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '/home/btsalwa/class/phase-5-project-group-7/client/src/features/posts/postsSlice.js';

const PostList = ({ clubId }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const loading = useSelector((state) => state.posts.loading);
    const error = useSelector((state) => state.posts.error);

    useEffect(() => {
        dispatch(fetchPosts(clubId));
    }, [dispatch, clubId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
