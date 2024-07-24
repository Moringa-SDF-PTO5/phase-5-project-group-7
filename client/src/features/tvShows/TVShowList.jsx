import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTVShows } from './tvShowsSlice';
import { Grid, Typography, Alert } from '@mui/material';
import TVShowCard from '/home/btsalwa/class/phase-5-project-group-7/client/src/components/TVShowCard.jsx';

const TVShowList = () => {
  const dispatch = useDispatch();
  const { tvShows, status, error } = useSelector((state) => state.tvShows);

  useEffect(() => {
    dispatch(getTVShows());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>TV Shows</Typography>
      <Grid container spacing={2}>
        {tvShows.map((show) => (
          <Grid item xs={12} sm={6} md={4} key={show.id}>
            <TVShowCard show={show} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TVShowList;
