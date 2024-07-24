import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostDetails } from './postsSlice';
import { Box, Typography, Alert } from '@mui/material';

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPostDetails(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>{post.title}</Typography>
      <Typography variant="body1">{post.content}</Typography>
    </Box>
  );
};

export default PostDetails;
