import React from 'react';
import './Footer.css'; // Import CSS for styling

const Footer = () => {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} Movies/Series Club. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
