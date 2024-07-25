import React from 'react';
import { Card, CardContent, Typography, CardMedia, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/path/to/default/image.jpg'; // Default image if no poster

  return (
    <Card>
      <CardMedia
        component="img"
        alt={movie.title}
        height="300"
        image={posterUrl}
      />
      <CardContent>
        <Link component={RouterLink} to={`/movie/${movie.id}`} color="inherit" underline="none">
          <Typography variant="h5" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.overview}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
