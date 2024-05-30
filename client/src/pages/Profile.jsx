import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import styles from './Profile.module.css';

const Profile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, loading, error } = useQuery(QUERY_USER, { variables: { _id: id } });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading user data!</p>;
    return (
    <div className={styles.profilePage}>
        <div className={styles.card}>
            {data.user.profilePictureURL && (<img src={data.user.profilePictureURL || 'placeholder.png'} alt={`${data.user.firstName} ${data.user.lastName}`} className={styles.profileImage} />)}

            <h3>{data.user.firstName} {data.user.lastName} </h3>
            <h5 className={styles.iqTag}>IQ {data.user.iq.toFixed(0)}</h5>
            <p>{data.user.email}</p>
            <p>{data.user.profileBio}</p>

            <button className={styles.navButton} onClick={() => navigate('/')}>Back to Dashboard</button>
        </div>
    </div>
    );
};

export default Profile;