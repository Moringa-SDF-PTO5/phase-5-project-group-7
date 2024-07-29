import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  useEffect(() => {
    // Simulate async operation if needed (e.g., fetching auth state)
    const checkAuth = async () => {
      // If your state is not immediately available, check async storage or API
      // For example, you could verify a token from sessionStorage here
      // const token = sessionStorage.getItem('token');
      // const isAuthenticated = !!user || !!token;
      const isAuthenticated = !!user; // Use actual authentication check
      setLoading(false);
    };

    checkAuth();
  }, [user]);

  if (loading) {
    // Optionally, show a loading spinner or message while checking auth
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
