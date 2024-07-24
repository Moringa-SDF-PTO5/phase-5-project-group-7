import React from 'react';
import { Card, Heading, Text } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import { IMAGE_URL_W300 } from '../constants';

const MovieCard = ({ movie }) => {
  return (
    <Card elevation={1} padding={20} marginBottom={20}>
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`${IMAGE_URL_W300}${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
          style={{ width: '60%', maxHeight: '300px', objectFit: 'cover', borderRadius: '5px' }}
        />
        <Heading size={400}>{movie.title}</Heading>
        <Text size={300} color="#666">{movie.overview}</Text>
      </Link>
    </Card>
  );
};

export default MovieCard;
