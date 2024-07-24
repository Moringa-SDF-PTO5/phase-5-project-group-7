import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { performSearch } from './searchSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const { results, status, error } = useSelector((state) => state.search);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(performSearch(query));
  };

  return (
    <div>
      <h2>Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies, TV shows, users, clubs..."
        />
        <button type="submit">Search</button>
      </form>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      {status === 'succeeded' && (
        <div>
          <h3>Movies</h3>
          <ul>
            {results.movies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
          <h3>TV Shows</h3>
          <ul>
            {results.tvShows.map((show) => (
              <li key={show.id}>{show.name}</li>
            ))}
          </ul>
          <h3>Users</h3>
          <ul>
            {results.users.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
          <h3>Clubs</h3>
          <ul>
            {results.clubs.map((club) => (
              <li key={club.id}>{club.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
