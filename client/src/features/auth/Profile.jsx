import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../features/auth/authSlice';
import './Profile.css'; // Import CSS for styling

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
        if (user) {
            setBio(user.bio || '');
            setProfilePic(user.profile_pic || '');
        }
        dispatch(fetchUserProfile());
    }, [dispatch, user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const updatedData = { bio, profile_pic: profilePic };
        await dispatch(updateUserProfile(updatedData));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="profile">
            <h2>User Profile</h2>
            <form onSubmit={handleUpdateProfile}>
                <div>
                    <label>Username: {user.username}</label>
                </div>
                <div>
                    <label>Email: {user.email}</label>
                </div>
                <div>
                    <label>Bio:</label>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>
                <div>
                    <label>Profile Picture URL:</label>
                    <input type="text" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
