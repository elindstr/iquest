import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import { ADD_FRIEND, UN_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';
import './FindFriends.css';

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
    <div className="dashboard-page">
      <div className="card">
        <h1>Search Users</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search users..."
          className="search-input"
        />
        <div className="user-list">
          {searchResults.map((user) => (
            <div key={user._id} className="user-card">
              <p className="user-list-item" key={user._id}>{user.firstName || '-'} {user.lastName || '-'} - {user.email || '-'}</p>
              {user.isFriend ? (
                <button onClick={() => handleUnFriend(user._id)} className="unfriend-button">Unfriend</button>
              ) : (
                <button onClick={() => handleAddFriend(user._id)} className="addfriend-button">Add Friend</button>
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