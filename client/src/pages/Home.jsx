import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to the Home Page</h1>
            <p>Explore clubs, movies, and TV shows.</p>
            <div className="discover-section">
                <div>
                    <Link to="/discover/movies">Discover Movies</Link>
                </div>
                <div>
                    <Link to="/tv-shows">Discover TV Shows</Link>
                </div>
            </div>
            <div className="auth-section">
                <div>
                    <Link to="/login">Login</Link>
                </div>
                <div>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;