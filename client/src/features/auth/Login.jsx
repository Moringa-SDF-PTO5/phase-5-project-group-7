import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from './authSlice';
import { Box, TextField, Button, Alert, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(userLogin({ username, password }));
      if (response.meta.requestStatus === 'fulfilled') {
        // Store user info in local storage
        localStorage.setItem('user', JSON.stringify(response.payload));
        navigate('/clubs'); // Redirect to clubs page
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
