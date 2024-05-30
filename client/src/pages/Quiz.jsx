import QuizBoard from '../components/QuizBoard';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../components/Quiz.module.css';

const Quiz = () => {
  const location = useLocation();
  const { triviaData } = location.state || {};
  const navigate = useNavigate();

  if (!triviaData) {
    return (
      <div className={styles.quizPage}>
        <p>No quiz data available. Please start a new quiz.</p>
        <button onClick={() => navigate('/new-quiz')}>Start a New Quiz</button>
      </div>
    );
  }

  return (
    <div className={styles.quizPage}>
      <QuizBoard triviaData={triviaData} />
    </div>
  );
};

export default Quiz;
