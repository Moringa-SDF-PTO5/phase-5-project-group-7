import React from 'react';
import { Card, CardContent, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const TVShowCard = ({ show }) => {
  return (
    <Card>
      <CardContent>
        <Link component={RouterLink} to={`/tv-Show/${show.id}`} color="inherit" underline="none">
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
