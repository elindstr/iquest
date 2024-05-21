import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { UPDATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const UpdateProfile = () => {
  const [post, setPost] = useState('');
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