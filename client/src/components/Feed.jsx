import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_QUIZES } from '../utils/queries';
import { ADD_QUIZ_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';
import styles from './Feed.module.css';

const QuizFeed = () => {
  const currentUser = Auth.getProfile().data._id;

  const { loading, data, error, refetch } = useQuery(QUERY_QUIZES);
  const [addComment] = useMutation(ADD_QUIZ_COMMENT);
  const [commentText, setCommentText] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const quizzes = data.quizes.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleCommentSubmit = async (quizId) => {
    try {
      await addComment({
        variables: {
          _id: quizId,
          userId: currentUser,
          commentText
        }
      });
      setCommentText('');
      setSelectedQuiz(null);
      refetch(); // Refetch the data to include the new comment
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  return (
    <div className={styles.feedPage}>
      {quizzes.map((quiz) => (
        <div key={quiz._id} className={styles.quizItem}>
          <div className={styles.quizUserInfo}>
            <img src={quiz.user.profilePictureURL || 'default-profile.png'} alt={`${quiz.user.firstName} ${quiz.user.lastName}`} />
            <div>
              <h3>{`${quiz.user.firstName} ${quiz.user.lastName}`}</h3>
            </div>
          </div>
          <div className={styles.quizDetails}>
            <p><strong>Date:</strong> {new Date(quiz.date).toLocaleDateString()}</p>
            <p><strong>Difficulty:</strong> {quiz.difficulty}</p>
            <p><strong>Category:</strong> {quiz.category}</p>
            <p><strong>Count:</strong> {quiz.count}</p>
            <p><strong>Success Rate:</strong> {quiz.percentCorrect * 100}%</p>
          </div>
          <div className={styles.quizComments}>
            {quiz.comments && quiz.comments.length > 0 && quiz.comments.map((comment) => (
              <div key={comment._id} className={styles.comment}>
                <img src={comment.user.profilePictureURL || 'default-profile.png'} alt={`${comment.user.firstName} ${comment.user.lastName}`} />
                <div>
                  <p><strong>{comment.user.firstName} {comment.user.lastName}:</strong> {comment.commentText}</p>
                  <p className={styles.commentDate}>{new Date(comment.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            <div className={styles.addComment}>
              <textarea
                value={selectedQuiz === quiz._id ? commentText : ''}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                onFocus={() => setSelectedQuiz(quiz._id)}
              />
              <button onClick={() => handleCommentSubmit(quiz._id)}>Post Comment</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizFeed;
