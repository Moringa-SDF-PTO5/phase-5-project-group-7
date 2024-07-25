import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from './authSlice';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setBio(user.bio);
      setProfilePic(user.profile_pic);
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      await dispatch(updateUserProfile({ username, email, bio, profile_pic: profilePic }));
    } catch (err) {
      setUpdateError('Failed to update profile.');
    }
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>Profile Settings</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {updateError && <Alert severity="error">{updateError}</Alert>}
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Profile Picture URL"
        value={profilePic}
        onChange={(e) => setProfilePic(e.target.value)}
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
