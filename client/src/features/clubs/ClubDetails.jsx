import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClubById, getClubPosts } from './clubsSlice';
import { Box, Typography, Alert } from '@mui/material';
import PostCard from '/home/btsalwa/class/phase-5-project-group-7/client/src/components/PostCard.jsx';
import CreatePost from '../posts/CreatePost';

const ClubDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentClub, posts, status, error } = useSelector((state) => state.clubs);

  useEffect(() => {
    dispatch(getClubById(id));
    dispatch(getClubPosts(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!currentClub) {
    return <div>Club not found</div>;
  }

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>{currentClub.name}</Typography>
      <Typography variant="body1">Genre: {currentClub.genre}</Typography>
      <Typography variant="body2">{currentClub.description}</Typography>
      <CreatePost clubId={currentClub.id} />
      <Typography variant="h5" gutterBottom>Posts</Typography>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Box>
  );
};

export default ClubDetails;
