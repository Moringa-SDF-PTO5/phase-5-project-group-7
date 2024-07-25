import React from 'react';
import { Card, CardContent, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ClubCard = ({ club }) => {
  return (
    <Card>
      <CardContent>
        <Link component={RouterLink} to={`/club/${club.id}`} color="inherit" underline="none">
          <Typography variant="h5" gutterBottom>
            {club.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Genre: {club.genre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {club.description}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};
 
export default ClubCard;
