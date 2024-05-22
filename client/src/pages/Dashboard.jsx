import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <div className="dashboard-page">
      <div className="card">
        <h1>Dashboard</h1>
        <button onClick={() => navigate('/find-friends')}>Find Friends</button>
        <button onClick={() => navigate('/update-profile')}>Update Profile</button>
        <button onClick={() => navigate('/quiz')}>New Quiz</button>
        <button onClick={() => navigate('/messaging')}>Messaging</button>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    </div>
  );
};

export default Dashboard;
