import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();
  
  return (
    <div className="dashboard-page">
      <div className="card">
        <h1>Update Profile</h1>
        <p>Profile update functionality will go here.</p>
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default UpdateProfile;
