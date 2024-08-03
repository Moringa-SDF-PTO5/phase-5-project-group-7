import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout } from './authSlice';
import '../../styles/Login.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const isLoggedIn = !!user; 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const result = await dispatch(login({ username, password })).unwrap();
            sessionStorage.setItem('token', result.token); 
            sessionStorage.setItem('user_id', result.user_id); 
            navigate('/clubs'); 
        } catch (err) {
            setError('Failed to log in. Please check your credentials and try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user_id');
        navigate('/');
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <>
                    <p>Welcome back! Please enter your credentials to access your clubs.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Login;
