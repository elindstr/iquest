import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { UPDATE_USER } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import styles from './UpdateProfile.module.css';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const userId = Auth.getProfile().data._id;
  const { data, loading, error } = useQuery(QUERY_USER, { variables: { _id: userId } });

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileBio: '',
    password: '',
  });
  const [initialFormState, setInitialFormState] = useState(formState);
  const [editableFields, setEditableFields] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [updateUser] = useMutation(UPDATE_USER);
  const [profilePictureURL, setProfilePictureURL] = useState('');

  useEffect(() => {
    if (data) {
      const initialState = {
        firstName: data.user.firstName || '',
        lastName: data.user.lastName || '',
        email: data.user.email || '',
        profileBio: data.user.profileBio || '',
        password: '',
      };
      setFormState(initialState);
      setInitialFormState(initialState);
      setProfilePictureURL(data.user.profilePictureURL || '');
    }
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleFieldDoubleClick = (field) => {
    setEditableFields({ ...editableFields, [field]: true });
  };

  const handleFieldSave = async (field) => {
    try {
      await updateUser({ variables: { _id: userId, [field]: formState[field] } });
      setEditableFields({ ...editableFields, [field]: false });
      setInitialFormState({ ...initialFormState, [field]: formState[field] });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // We'll clean this up for the production version. But this is the only way I could think to wire it up so that both dev and render deployment work right now.
  const handleUpload = async () => {
    if (profilePicture) {
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);
      formData.append('userId', userId);

      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const result = await response.json();
        if (result.success) {
          setProfilePictureURL(result.filePath);
          setProfilePicture(null);
          console.log('File uploaded successfully:', result.filePath);
        }
      } catch (error) {
        console.error('Error uploading profile picture, trying backup URL:', error);
        try {
          const response = await fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Failed to upload image to backup URL');
          }

          const result = await response.json();
          if (result.success) {
            setProfilePictureURL(result.filePath);
            setProfilePicture(null);
            console.log('File uploaded successfully to backup URL:', result.filePath);
          }
        } catch (backupError) {
          console.error('Error uploading profile picture to backup URL:', backupError);
        }
      }
    }
  };

  const handleDeleteProfilePicture = async () => {
    try {
      await updateUser({ variables: { _id: userId, profilePictureURL: '' } });
      setProfilePictureURL('');
    } catch (error) {
      console.error('Error deleting profile picture:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data!</p>;

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.card}>
        <h1>Update Profile</h1>
        <p className={styles.note}>Double-click a field to edit</p>
        <form>
          {profilePictureURL && (
            <div className={styles.profilePicture}>
              <img src={profilePictureURL} alt="Profile" />
              <button type="button" className={styles.deleteButton} onClick={handleDeleteProfilePicture}>
                &times;
              </button>
            </div>
          )}
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              readOnly={!editableFields.firstName}
              className={!editableFields.firstName ? styles.readonly : ''}
              onDoubleClick={() => handleFieldDoubleClick('firstName')}
            />
            {editableFields.firstName && (
              <div className={styles.buttonGroup}>
                <button type="button" onClick={() => handleFieldSave('firstName')}>
                  Save
                </button>
                <button type="button" onClick={() => handleFieldCancel('firstName')}>
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              readOnly={!editableFields.lastName}
              className={!editableFields.lastName ? styles.readonly : ''}
              onDoubleClick={() => handleFieldDoubleClick('lastName')}
            />
            {editableFields.lastName && (
              <div className={styles.buttonGroup}>
                <button type="button" onClick={() => handleFieldSave('lastName')}>
                  Save
                </button>
                <button type="button" onClick={() => handleFieldCancel('lastName')}>
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              readOnly={!editableFields.email}
              className={!editableFields.email ? styles.readonly : ''}
              onDoubleClick={() => handleFieldDoubleClick('email')}
            />
            {editableFields.email && (
              <div className={styles.buttonGroup}>
                <button type="button" onClick={() => handleFieldSave('email')}>
                  Save
                </button>
                <button type="button" onClick={() => handleFieldCancel('email')}>
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div>
            <label>Profile Bio</label>
            <textarea
              name="profileBio"
              value={formState.profileBio}
              onChange={handleChange}
              readOnly={!editableFields.profileBio}
              className={!editableFields.profileBio ? styles.readonly : ''}
              onDoubleClick={() => handleFieldDoubleClick('profileBio')}
            />
            {editableFields.profileBio && (
              <div className={styles.buttonGroup}>
                <button type="button" onClick={() => handleFieldSave('profileBio')}>
                  Save
                </button>
                <button type="button" onClick={() => handleFieldCancel('profileBio')}>
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div>
            <label>Password</label>
            <input
              type={editableFields.password ? 'text' : 'password'}
              name="password"
              value={formState.password}
              onChange={handleChange}
              readOnly={!editableFields.password}
              className={!editableFields.password ? styles.readonly : ''}
              onDoubleClick={() => handleFieldDoubleClick('password')}
            />
            {editableFields.password && (
              <div className={styles.buttonGroup}>
                <button type="button" onClick={() => handleFieldSave('password')}>
                  Save
                </button>
                <button type="button" onClick={() => handleFieldCancel('password')}>
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div>
            <label>Profile Picture</label>
            <input type="file" onChange={handleFileChange} />
            {profilePicture && (
              <div className={styles.buttonGroup}>
                <button type="button" onClick={handleUpload}>
                  Upload
                </button>
                <button type="button" onClick={() => setProfilePicture(null)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default UpdateProfile;
