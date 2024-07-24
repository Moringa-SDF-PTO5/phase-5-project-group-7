import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClubs } from './clubsSlice';
import { Grid, Typography, Alert } from '@mui/material';
import ClubCard from '/home/btsalwa/class/phase-5-project-group-7/client/src/components/ClubCard.jsx';

const ClubList = () => {
  const dispatch = useDispatch();
  const { clubs, status, error } = useSelector((state) => state.clubs);

  useEffect(() => {
    dispatch(getClubs());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Clubs</Typography>
      <Grid container spacing={2}>
        {clubs.map((club) => (
          <Grid item xs={12} sm={6} md={4} key={club.id}>
            <ClubCard club={club} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ClubList;
