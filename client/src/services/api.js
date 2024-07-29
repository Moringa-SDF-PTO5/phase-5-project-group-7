import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',
});

// Add an interceptor to include the token in the headers if needed
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token'); // Assuming you're using session storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
