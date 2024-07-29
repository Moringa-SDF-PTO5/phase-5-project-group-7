import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Club from './pages/Club';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import CreateClub from './features/clubs/CreateClub';
import CreatePost from './features/posts/CreatePost';
import ProtectedRoute from '/home/btsalwa/class/phase-5-project-group-7/client/src/components/PrivateRoute.jsx';

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/discover" component={Discover} />
                <ProtectedRoute path="/club/:id" component={Club} />
                <ProtectedRoute path="/profile" component={Profile} />
                <Route path="/search" component={Search} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <ProtectedRoute path="/create-club" component={CreateClub} />
                <ProtectedRoute path="/create-post" component={CreatePost} />
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
