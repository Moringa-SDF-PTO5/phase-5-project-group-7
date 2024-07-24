import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from './moviesSlice';
import { Box, Typography, Alert } from '@mui/material';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movie, status, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getMovieDetails(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>{movie.title}</Typography>
      <Typography variant="body1">{movie.overview}</Typography>
      <Typography variant="body2">Release Date: {movie.release_date}</Typography>
    </Box>
  );
};

export default MovieDetails;
