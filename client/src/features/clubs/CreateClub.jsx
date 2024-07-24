import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createClub } from './clubsSlice';
import { Box, TextField, Button, Alert, Typography } from '@mui/material';

const CreateClub = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createClub({ name, description, genre }));
      // Optionally redirect or show success message
      setName('');
      setDescription('');
      setGenre('');
    } catch (err) {
      setError('Failed to create club. Please try again.');
    }
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>Create New Club</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Club Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Club Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Club Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Club
        </Button>
      </form>
    </Box>
  );
};

export default CreateClub;
