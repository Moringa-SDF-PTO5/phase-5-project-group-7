import axios from 'axios';

const api = axios.create({
    baseURL: 'https://phase-5-project-group-7.onrender.com',
});

// Add an interceptor to include the token in the headers if needed
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
      console.error('API request error:', error.response ? error.response.data : error.message);
      return Promise.reject(error);
  }
);

export default api;
