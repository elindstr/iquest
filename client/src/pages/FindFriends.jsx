import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import { ADD_FRIEND, UN_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';
import './FindFriends.css';

const FindFriends = ({ currentUserId }) => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(QUERY_USERS);
  const [addFriend] = useMutation(ADD_FRIEND);
  const [unFriend] = useMutation(UN_FRIEND);
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const myEmail = Auth.getProfile().data.email;

  // Effect to handle data received from the query
  useEffect(() => {
    if (data) {
      const filteredUsers = data.users.filter(user => user.email !== myEmail);
      setUsers(filteredUsers);
      setSearchResults(filteredUsers);
    }
  }, [data, currentUserId]);

  // Handle search input changes
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = users.filter(user =>
      user.email.toLowerCase().includes(value) ||
      user.lastName.toLowerCase().includes(value) ||
      user.firstName.toLowerCase().includes(value)
    );
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
              <p className="user-list-item">{user.firstName} {user.lastName} - {user.email}</p>
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
