import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});

export const fetchMovies = () => api.get('/discover/movies');
export const fetchTVShows = () => api.get('/discover/tv');
export const fetchMovieById = (id) => api.get(`/find/${id}`);
export const fetchTVShowById = (id) => api.get(`/find/${id}`);
export const fetchClubs = () => api.get('/clubs');
export const fetchClubById = (id) => api.get(`/club/${id}`);
export const createClub = (clubData) => api.post('/club', clubData);
export const updateClub = (id, clubData) => api.put(`/club/${id}`, clubData);
export const deleteClub = (id) => api.delete(`/club/${id}`);
export const fetchPosts = () => api.get('/posts');
export const fetchPostById = (id) => api.get(`/post/${id}`);
export const login = (credentials) => api.post('/login', credentials);
export const register = (userData) => api.post('/register', userData);
export const search = (query) => api.get(`/search?q=${query}`);

export default api;

