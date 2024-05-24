import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import styles from './Dashboard.module.css';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


const Dashboard = () => {
  const navigate = useNavigate();
  const userId = Auth.getProfile().data._id;
  const { data: userData, loading, error } = useQuery(QUERY_USER, { variables: { _id: userId } });

  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.card}>
        <span>{userData? userData.user.firstName: null}: {userData? userData.user.iq.toFixed(2): null} IQ</span>
        <h1 className={styles.h1}>Dashboard</h1>
        <div className={styles.containerButton}>
          <button className={styles.button} onClick={() => navigate('/find-friends')}>Find Friends</button>
          <button className={styles.button} onClick={() => navigate('/update-profile')}>View Profile</button>
          <button className={styles.button} onClick={() => navigate('/quiz')}>New Quiz</button>
          <button className={styles.button} onClick={() => navigate('/donate')}>Donate</button>
          <button className={styles.button} onClick={() => navigate('/feed')}>Feed (demo/development)</button>
          <button className={styles.button} onClick={handleLogout}>Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
