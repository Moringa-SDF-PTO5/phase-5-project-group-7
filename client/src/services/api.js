import axios from 'axios';

const api = axios.create({
    baseURL: 'https://phase-5-project-group-7.onrender.com',
});

// Add an interceptor to include the token in the headers if needed
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token'); // Assuming you're using session storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle errors globally
      console.error('API request error:', error);
      return Promise.reject(error);
    }
  );

export default api;
