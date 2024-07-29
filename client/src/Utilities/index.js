export const isAuthenticated = () => {
    return !!sessionStorage.getItem('token'); // Check if the token exists
};

export const logout = () => {
    sessionStorage.removeItem('token'); // Clear the token on logout
};
