import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchItems } from '../features/search/searchSlice';

const Search = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const searchResults = useSelector((state) => state.search.results);
    const loading = useSelector((state) => state.search.loading);
    const error = useSelector((state) => state.search.error);

    const handleSearch = async (e) => {
        e.preventDefault();
        dispatch(searchItems(query));
    };

    return (
        <div>
            <h2>Search</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <ul>
                {searchResults.map(result => (
                    <li key={result.id}>{result.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
