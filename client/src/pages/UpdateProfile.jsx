import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const [post, setPost] = useState('');
  const navigate = useNavigate();

  const handlePost = () => {
    // need to make user id fetching function and replace getCurretnUserId or name function as such
    const userId = getCurrentUserId();

    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, text: post }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setPost(''); // Clear the textarea
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="dashboard-page">
      <div className="card">
        <h1>Update Profile</h1>
        <textarea value={post} onChange={(e) => setPost(e.target.value)}/>
        <button onClick={handlePost}>Post</button>
        <p>Profile update functionality will go here.</p>
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default UpdateProfile;