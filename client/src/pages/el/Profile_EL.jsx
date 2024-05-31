import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_QUIZES } from '../utils/queries';
import styles from '../Profile.module.css';

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: userData, loading: userLoading, error: userError } = useQuery(QUERY_USER, { variables: { _id: id } });
  const { data: quizData, loading: quizLoading, error: quizError } = useQuery(QUERY_QUIZES);

  if (userLoading || quizLoading) return <p>Loading...</p>;
  if (userError || quizError) return <p>Error loading data!</p>;

  const user = userData.user;
  const quizzes = quizData.quizes.filter(quiz => quiz.user._id === id);
  const quizCount = quizzes.length;
  const iqRank = calculateIqRank(user, user.friends); // Function to calculate IQ rank among friends

  return (
    <div className={styles.profilePage}>
      <div className={styles.card}>
        {user.profilePictureURL && (
          <img src={user.profilePictureURL} alt={`${user.firstName} ${user.lastName}`} className={styles.profileImage} />
        )}
        <div className="profile-info">
          <h2>{user.firstName} {user.lastName} <span className={styles.iqTag}>IQ {user.iq}</span></h2>
          <p>{user.email}</p>
          <p>{user.profileBio}</p>
          <p><strong>Quizzes Taken:</strong> {quizCount}</p>
          <p><strong>IQ Rank Among Friends:</strong> {iqRank}</p>
          <button className={styles.navButton} onClick={() => navigate('/')}>Back to Dashboard</button>
        </div>
      </div>
      <div className="profile-quiz-feed">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="quiz-item">
            <div className="quiz-details">
              <p><strong>Date:</strong> {new Date(quiz.date).toLocaleDateString()}</p>
              <p><strong>Difficulty:</strong> {quiz.difficulty}</p>
              <p><strong>Category:</strong> {quiz.category}</p>
              <p><strong>Count:</strong> {quiz.count}</p>
              <p><strong>Success Rate:</strong> {(quiz.percentCorrect * 100).toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const calculateIqRank = (user, friends) => {
  const allUsers = [...friends, user];
  allUsers.sort((a, b) => b.iq - a.iq);
  return allUsers.findIndex(u => u._id === user._id) + 1;
};

export default Profile;
