import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import { useNavigate } from 'react-router-dom';
import styles from './LeaderBoard.module.css';

const LeaderBoard = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(QUERY_USERS);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data && data.users) {
      const sortedUsers = [...data.users].sort((a, b) => b.iq - a.iq);
      setUsers(sortedUsers);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <div className={styles.leaderBoardPage}>
      <div className={styles.card}>
        <h1>Leaderboard</h1>
        <div className={styles.userList}>
          {users.map((user) => (
            <div key={user._id} className={styles.userCard}>
              <p className={styles.userListItem}>
                {user.profilePictureURL && (
                  <img
                    src={user.profilePictureURL}
                    alt={`${user.firstName} ${user.lastName}`}
                    className={styles.profileImage}
                  />
                )}
                {user.firstName || '-'}&nbsp;
                {user.lastName || '-'}:&nbsp;
                {user.iq} IQ
              </p>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default LeaderBoard;