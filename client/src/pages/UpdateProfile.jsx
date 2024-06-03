import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { UPDATE_USER } from '../utils/mutations';
import { QUERY_USER, QUERY_USERS } from '../utils/queries';
import Auth from '../utils/auth';
import styles from './UpdateProfile.module.css';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const userId = Auth.getProfile().data._id;
  const { data, loading, error } = useQuery(QUERY_USER, { variables: { _id: userId } }, {
    fetchPolicy: 'cache-and-network'
  });
  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(QUERY_USERS, {
    fetchPolicy: 'cache-and-network'
  });
  const [users, setUsers] = useState([]);

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
  const [editMode, setEditMode] = useState(false);

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

  useEffect(() => {
    if (data && data.user && usersData && usersData.users) {
      const friendsIds = data.user.friends.map(friend => friend._id);
      const friends = usersData.users.filter(user => friendsIds.includes(user._id));
      setUsers(friends);
    }
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleSaveProfile = async () => {
    try {
      await updateUser({
        variables: {
          _id: userId,
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          profileBio: formState.profileBio,
          password: formState.password,
        }
      });
      setEditableFields({});
      setInitialFormState({ ...formState });
      setEditMode(false);
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

  const handleEditProfile = () => {
    setEditMode(!editMode);
  };

  if (loading || usersLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data!</p>;

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.card}>
        <h1>My Profile</h1>
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
              readOnly={!editMode}
              className={!editMode ? 'styles.readonly' : ''}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              readOnly={!editMode}
              className={!editMode ? 'styles.readonly' : ''}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              readOnly={!editMode}
              className={!editMode ? 'styles.readonly' : ''}
            />
          </div>
          <div>
            <label>Profile Bio</label>
            <textarea
              name="profileBio"
              value={formState.profileBio}
              onChange={handleChange}
              readOnly={!editMode}
              className={!editMode ? 'styles.readonly' : ''}
            />
          </div>
          <div className={styles.friends}>
            <label>Friends List</label><br />
            <button className={styles.button} onClick={() => navigate('/find-friends')}>Find Friends</button>
            <div className={styles.friendsContainer}>
              {users.map((user, index) => (
                <Link key={user._id} className={styles.userCard} to={`/profile/${user._id}`}>
                  <p className={styles.userListItem}>
                    <img
                      src={user.profilePictureURL || 'placeholder.png'}
                      alt={`${user.firstName} ${user.lastName}`}
                      className={styles.profileImage}
                    />
                      {user.firstName || '-'}&nbsp;
                      {user.lastName || '-'}:&nbsp;
                      {user.iq.toFixed(0)} IQ
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <label>Password</label>
            <input
              type={editableFields.password ? 'text' : 'password'}
              name="password"
              value={formState.password}
              onChange={handleChange}
              readOnly={!editMode}
              className={!editMode ? 'styles.readonly' : ''}
            />
          </div>
          <div>
            <label>Profile Picture</label>
            <input type="file" onChange={handleFileChange} />
            {profilePicture && (
              <div className={styles.containerButton}>
                <button className={styles.button} type="button" onClick={handleUpload}>
                  Upload
                </button>
                <button className={styles.button} type="button" onClick={() => setProfilePicture(null)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
          {editMode && (
            <div>
              <button className={styles.button} type="button" onClick={handleSaveProfile}>
                Save
              </button>
            </div>
          )}
        </form>
        <div className={styles.containerButton}>
          <button className={styles.button}type="button" onClick={handleEditProfile}>
            {editMode ? 'Cancel Edit' : 'Edit Profile'}
          </button>
          <button className={styles.button} onClick={() => navigate('/')} >Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
