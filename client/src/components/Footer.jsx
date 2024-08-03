import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} Movies/Series Club. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
