import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ mt: 'auto', p: 2, backgroundColor: '#f8f8f8' }}>
      <Typography variant="body2" color="textSecondary" align="center">
        © 2024 Movie Club. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
