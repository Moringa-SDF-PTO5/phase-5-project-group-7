import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { rateClub } from './clubsSlice';
import { Box, Rating, Typography, Alert } from '@mui/material';

const RatingComponent = ({ clubId }) => {
    const dispatch = useDispatch();
    const [score, setScore] = useState(0);
    const [error, setError] = useState('');

    const handleRatingChange = async (newValue) => {
        setScore(newValue);
        try {
            await dispatch(rateClub({ clubId, score: newValue }));
        } catch (err) {
            setError('Failed to submit rating.');
        }
    };

    return (
        <Box>
            <Typography variant="h6">Rate this Club</Typography>
            <Rating
                name="club-rating"
                value={score}
                onChange={(event, newValue) => handleRatingChange(newValue)}
            />
            {error && <Alert severity="error">{error}</Alert>}
        </Box>
    );
};

export default RatingComponent;
