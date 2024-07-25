import React from 'react';
import { Card, CardContent, Typography, CardMedia, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const TVShowCard = ({ show }) => {
  const posterUrl = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : '/path/to/default/image.jpg'; // Default image if no poster

  return (
    <Card>
      <CardMedia
        component="img"
        alt={show.name}
        height="300"
        image={posterUrl}
      />
      <CardContent>
        <Link component={RouterLink} to={`/tvShow/${show.id}`} color="inherit" underline="none">
          <Typography variant="h5" gutterBottom>
            {show.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {show.overview}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default TVShowCard;
