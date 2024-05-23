import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_USERS } from '../utils/queries';
import { ADD_FRIEND, UN_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';
import styles from './FindFriends.module.css';

const FindFriends = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(QUERY_USERS);
  const [addFriend] = useMutation(ADD_FRIEND, {
    refetchQueries: [{ query: QUERY_USERS }],
  });
  const [unFriend] = useMutation(UN_FRIEND, {
    refetchQueries: [{ query: QUERY_USERS }],
  });
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const myEmail = Auth.getProfile().data.email;
  const myId = Auth.getProfile().data._id;

  // Effect to handle data received from the query
  useEffect(() => {
    if (data) {
      // Find the current user in the data
      const myData = data.users.find(user => user.email === myEmail);
      const myFriendsIds = myData.friends.map(friend => friend._id);

      // Filter out the current user
      const filteredUsers = data.users.filter(user => user.email !== myEmail);

      // Add the isFriend tracker
      const usersWithFriendStatus = filteredUsers.map(user => ({
        ...user,
        isFriend: myFriendsIds.includes(user._id)
      }));

      setUsers(usersWithFriendStatus);
      setSearchResults(usersWithFriendStatus);
    }
  }, [data, myEmail, myId]);

  // Handle search input changes
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = users.filter(user => {
      const email = user.email || '';
      const firstName = user.firstName || '';
      const lastName = user.lastName || '';
      return (
        email.toLowerCase().includes(value) ||
        firstName.toLowerCase().includes(value) ||
        lastName.toLowerCase().includes(value)
      );
    });
    setSearchResults(filtered);
  };

  const handleAddFriend = async (friendId) => {
    try {
      await addFriend({ variables: { friendId } });
      setUsers(users.map(user => user._id === friendId ? { ...user, isFriend: true } : user));
      setSearchResults(searchResults.map(user => user._id === friendId ? { ...user, isFriend: true } : user));
    } catch (err) {
      console.error('Error adding friend:', err);
    }
  };

  const handleUnFriend = async (friendId) => {
    try {
      await unFriend({ variables: { friendId } });
      setUsers(users.map(user => user._id === friendId ? { ...user, isFriend: false } : user));
      setSearchResults(searchResults.map(user => user._id === friendId ? { ...user, isFriend: false } : user));
    } catch (err) {
      console.error('Error removing friend:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.card}>
        <h1>Search Users</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search users..."
          className={styles.searchInput}
        />
        <div className={styles.userList}>
          {searchResults.map((user) => (
            <div key={user._id} className={styles.userCard}>
              <Link className={styles.userListItemLink} to={`/profile/${user._id}`}>
                <p className={styles.userListItem} key={user._id}>
                  {user.profilePictureURL && (
                    <img
                      src={user.profilePictureURL}
                      alt={`${user.firstName} ${user.lastName}`}
                      className={styles.profileImage}
                    />
                  )}
                  {user.firstName || '-'}&nbsp;
                  {user.lastName || '-'} - 
                  {user.email || '-'} -
                  {user.iq || '-'}
                </p>
              </Link>

              {user.isFriend ? (
                <button
                  onClick={() => handleUnFriend(user._id)}
                  className={styles.unfriendButton}
                >
                  Unfriend
                </button>
              ) : (
                <button
                  onClick={() => handleAddFriend(user._id)}
                  className={styles.addfriendButton}
                >
                  Add Friend
                </button>
              )}
            </div>
          ))}
        </div>
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default FindFriends;
