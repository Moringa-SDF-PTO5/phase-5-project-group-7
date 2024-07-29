import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/register', { username, email, password });
            alert(response.data.msg);
            history.push('/login'); // Redirect to login after registration
        } catch (error) {
            alert(error.response.data.msg);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
