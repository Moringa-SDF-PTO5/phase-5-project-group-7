import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchClubDetail } from '../features/clubs/clubSlice';
import PostList from '../features/posts/PostList';

const Club = () => {
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

    return (
        <div>
            <h2>{club.name}</h2>
            <p>{club.description}</p>
            <PostList clubId={id} />
        </div>
    );
};

export default Club;
