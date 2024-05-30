import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS, QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import styles from './LeaderBoard.module.css';

const LeaderBoard = () => {
  const navigate = useNavigate();
  const userId = Auth.getProfile().data._id;
  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(QUERY_USERS);
  const { data: userData, loading: userLoading, error: userError } = useQuery(QUERY_USER, { variables: { _id: userId } });
  const [users, setUsers] = useState([]);
  const [showFriends, setShowFriends] = useState(false);

  // Sort and set users when data is fetched
  useEffect(() => {
    if (usersData && usersData.users) {
      const sortedUsers = [...usersData.users].sort((a, b) => b.iq - a.iq);
      setUsers(sortedUsers);
    }
  }, [usersData]);

  // Update users based on toggle state
  useEffect(() => {
    if (userData && userData.user && usersData && usersData.users) {
      const friendsIds = userData.user.friends.map(friend => friend._id);
      const friends = usersData.users.filter(user => friendsIds.includes(user._id));
      const sortedFriends = [...friends].sort((a, b) => b.iq - a.iq);
      setUsers(showFriends ? sortedFriends : [...usersData.users].sort((a, b) => b.iq - a.iq));
    }
  }, [showFriends, userData, usersData]);

  if (usersLoading || userLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error! {usersError.message}</p>;
  if (userError) return <p>Error! {userError.message}</p>;

  // Toggle function to switch between all users and friends
  const toggleShowFriends = () => {
    setShowFriends(!showFriends);
  };

  // Main return
  return (
    <div className={styles.leaderBoardPage}>
      <div className={styles.card}>
        <h1>Leaderboard</h1>
        
        <div className={styles.toggleContainer}>
          <label className={styles.toggleLabel}>
            <span>{showFriends ? 'Showing Friends' : 'Showing All Users'}</span>
            <input
              type="checkbox"
              checked={showFriends}
              onChange={toggleShowFriends}
              className={styles.toggleInput}
            />
            <span className={styles.toggleSlider} />
          </label>
        </div>
        <div className={styles.userList}>
          {users.map((user, index) => (
            <div key={user._id} className={styles.userCard}>
              <span className={styles.userRank}>{index + 1}</span>
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
            </div>
          ))}
        </div>
        <button className={styles.button} onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default LeaderBoard;
