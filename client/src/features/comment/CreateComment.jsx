import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from './postsSlice';
import { Box, TextField, Button, Alert } from '@mui/material';

const CreateComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createComment({ postId, content }));
      setContent('');
    } catch (err) {
      setError('Failed to add comment. Please try again.');
    }
  };

  return (
    <Box padding={2}>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Comment
        </Button>
      </form>
    </Box>
  );
};

export default CreateComment;
