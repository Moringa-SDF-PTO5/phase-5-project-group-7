import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { username, password });
            alert(response.data.msg);
            history.push('/'); // Redirect to home after login
        } catch (error) {
            alert(error.response.data.msg);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
