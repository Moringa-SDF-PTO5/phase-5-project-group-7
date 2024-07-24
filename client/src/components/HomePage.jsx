import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ClubCard from './ClubCard';
import PostCard from './PostCard';


const HomePage = () => {
  return (
    <Box padding={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Discover Movies and TV Shows
          </Typography>
          <Button component={Link} to="/movies" variant="contained" color="primary">
            Browse Movies
          </Button>
          <Button component={Link} to="/tv-Shows" variant="contained" color="primary">
            Browse TV Shows
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            Popular Clubs
          </Typography>
          <Box>
            {/* Render a list of popular clubs */}
            <ClubCard club={{ id: 1, name: 'Action Movie Club', genre: 'Action' }} />
            <ClubCard club={{ id: 2, name: 'Sci-Fi Enthusiasts', genre: 'Sci-Fi' }} />
            <ClubCard club={{ id: 3, name: 'Comedy Connoisseurs', genre: 'Comedy' }} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            Recent Activity
          </Typography>
          <Box>
            {/* Render a list of recent posts and activities */}
            <PostCard post={{ id: 1, content: 'Just watched Inception, mind blown!' }} />
            <PostCard post={{ id: 2, content: 'Anyone else excited for the new Marvel series?' }} />
            <PostCard post={{ id: 3, content: 'Joined the Anime Club, looking forward to discussions!' }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
