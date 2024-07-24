import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from './postsSlice';
import { Box, TextField, Button, Alert } from '@mui/material';

const CreatePost = ({ clubId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createPost({ content, clubId }));
      setContent('');
    } catch (err) {
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <Box padding={2}>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Create Post
        </Button>
      </form>
    </Box>
  );
};

export default CreatePost;
