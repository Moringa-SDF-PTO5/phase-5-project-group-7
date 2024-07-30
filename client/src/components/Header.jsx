import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import ProfileIcon from '../features/auth/ProfileIcon';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isLoggedIn = !!user; // Assuming user is null or an object; adjust based on your state

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
                {isLoggedIn ? (
                    <>
                    <ProfileIcon user={user} />
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
