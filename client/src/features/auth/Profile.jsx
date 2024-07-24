import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from './authSlice';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const [bio, setBio] = useState('');
  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setBio(user.bio || '');
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      await dispatch(updateUserProfile({ bio }));
    } catch (err) {
      setUpdateError('Failed to update profile.');
    }
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {updateError && <Alert severity="error">{updateError}</Alert>}
      <TextField
        label="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update Profile
      </Button>
    </Box>
  );
};

export default Profile;
