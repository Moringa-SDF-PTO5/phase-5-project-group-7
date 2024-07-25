import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTVShowDetails } from './tvShowsSlice';
import { Box, Typography, Alert } from '@mui/material';

const TVShowDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tvShow, status, error } = useSelector((state) => state.tvShows);

  useEffect(() => {
    dispatch(getTVShowDetails(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <Alert severity="error">{error}</Alert>;
  }

  const posterUrl = tvShow.poster_path ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` : '/path/to/default/image.jpg'; // Default image if no poster

  return (
    <Box padding={2}>
      <img src={posterUrl} alt={tvShow.name} height="400" />
      <Typography variant="h4" gutterBottom>{tvShow.name}</Typography>
      <Typography variant="body1">{tvShow.overview}</Typography>
      <Typography variant="body2">First Air Date: {tvShow.first_air_date}</Typography>
    </Box>
  );
};

export default TVShowDetails;
