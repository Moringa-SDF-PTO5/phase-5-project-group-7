import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header>
            <h1>Movies/Series Club</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/discover">Discover</Link>
                <Link to="/clubs">Clubs</Link>
                {user ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
