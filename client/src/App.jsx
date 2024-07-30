import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Discover from './pages/Discover';
import ClubDetail from './features/clubs/ClubDetails';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import CreateClub from './features/clubs/CreateClub';
import CreatePost from './features/posts/CreatePost';
import Clubs from './pages/Clubs';
import ProtectedRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/clubs" element={<Clubs />} />
                <Route path="/club/:id" element={<ProtectedRoute><ClubDetail /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-club" element={<ProtectedRoute><CreateClub /></ProtectedRoute>} />
                <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
                <Route path="/clubs" element={<ProtectedRoute><Clubs /></ProtectedRoute>} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
