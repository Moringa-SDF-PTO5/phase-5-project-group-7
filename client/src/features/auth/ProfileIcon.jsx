import React from 'react';
import { Link } from 'react-router-dom';

function ProfileIcon({ user }) {
    const defaultAvatar = 'path/to/default/avatar.png'; // Replace with your default avatar path

    return (
        <Link to="/profile" className="profile-icon">
            <img
                src={user.profilePicture || defaultAvatar}
                alt="Profile"
                className="profile-picture"
            />
            <span className="profile-name">{user.username}</span>
        </Link>
    );
}

export default ProfileIcon;
