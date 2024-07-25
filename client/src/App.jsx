import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '/home/btsalwa/class/phase-5-project-group-7/client/src/store/store.js';
import HomePage from './components/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import MovieList from './features/movies/MovieList';
import TVShowList from './features/tvShows/TVShowList';
import ClubList from './features/clubs/ClubList';
import PostList from './features/posts/PostList';
import Profile from './features/auth/Profile';
import MovieDetails from './features/movies/MovieDetails';
import TVShowDetails from './features/tvShows/TVShowDetails';
import ClubDetails from './features/clubs/ClubDetails';
import CreateClub from './features/clubs/CreateClub';
import PostDetails from './features/posts/PostDetails';
import Search from './features/search/Search';
import './styles.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/tvShows" element={<TVShowList />} />
              <Route path="/tvShow/:id" element={<TVShowDetails />} />
              <Route path="/clubs" element={<ClubList />} />
              <Route path="/club/:id" element={<ClubDetails />} />
              <Route path="/create-club" element={<CreateClub />} />
              <Route path="/posts" element={<PostList />} />
              <Route path="/post/:id" element={<PostDetails />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
