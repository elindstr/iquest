import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.card}>
        <h1 className={styles.h1}>Dashboard</h1>
        <button className={styles.button} onClick={() => navigate('/find-friends')}>Find Friends</button>
        <button className={styles.button} onClick={() => navigate('/update-profile')}>Update Profile</button>
        <button className={styles.button} onClick={() => navigate('/quiz')}>New Quiz</button>
        <button className={styles.button} onClick={() => navigate('/donate')}>Donate</button>
        <button className={styles.button} onClick={handleLogout}>Sign Out</button>
      </div>
    </div>
  );
};

export default Dashboard;
