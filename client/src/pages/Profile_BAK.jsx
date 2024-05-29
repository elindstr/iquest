import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import '../pages/Profile.module.css';

const Profile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, loading, error } = useQuery(QUERY_USER, { variables: { _id: id } });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading user data!</p>;
    return (
    <div className="quiz-page">
        <div className="card">
            {data.user.profilePictureURL && (<img src={data.user.profilePictureURL} alt={`${data.user.firstName} ${data.user.lastName}`} className="profile-image" />)}

            <p>{data.user.firstName} {data.user.lastName} <span className="iq-tag">IQ {data.user.iq}</span></p>
            <p>{data.user.email}</p>
            <p>{data.user.profileBio}</p>

            <button onClick={() => navigate('/')}>Back to Dashboard</button>
        </div>
    </div>
    );
};

export default Profile;