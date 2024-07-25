import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Movie Club
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/movies">Movies</Button>
        <Button color="inherit" component={Link} to="/tvShows">TV Shows</Button>
        <Button color="inherit" component={Link} to="/clubs">Clubs</Button>
        <Button color="inherit" component={Link} to="/profile">Profile</Button>
        <Button color="inherit" component={Link} to="/posts">Posts</Button>
        <Button color="inherit" component={Link} to="/search">Search</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/register">Register</Button>


      </Toolbar>
    </AppBar>
  );
};

export default Header;
