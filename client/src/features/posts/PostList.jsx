import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './postsSlice';
import { Grid, Typography, Alert } from '@mui/material';
import PostCard from '/home/btsalwa/class/phase-5-project-group-7/client/src/components/PostCard.jsx';

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Posts</Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PostList;
