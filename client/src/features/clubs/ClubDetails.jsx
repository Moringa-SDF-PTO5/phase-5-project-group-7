import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchClubDetail } from './clubSlice';
import PostList from '../posts/PostList';
import CreatePost from '../posts/CreatePost';
import '../../styles/ClubDetail.css';

const ClubDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const club = useSelector((state) => state.clubs.selectedClub);
    const loading = useSelector((state) => state.clubs.loading);
    const error = useSelector((state) => state.clubs.error);

    useEffect(() => {
        dispatch(fetchClubDetail(id));
    }, [dispatch, id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!club || !club.created_by) return <div>No Club Found</div>;

    return (
        <div className="club-detail">
            <h2>{club.name}</h2>
            <p>{club.description}</p>
            <p>Genre: {club.genre}</p>
            <p>Created by: {club.created_by.username}</p>
            <h3>Members</h3>
            <ul>
                {club.members.length > 0 ? (
                    club.members.map((member) => (
                        <li key={member.id}>{member.username}</li>
                    ))
                ) : (
                    <li>No members</li>
                )}
            </ul>
            <h3>Posts</h3>
            <PostList clubId={club.id} />
            <CreatePost clubId={club.id} />
        </div>
    );
};

export default ClubDetail;
