import React from 'react';
import QuizBoard from '../components/QuizBoard';
import styles from '../components/Quiz.module.css';

const Quiz = () => {
  return (
    <div className={styles.quizPage}>
      <div className={styles.card}>
        <QuizBoard />
      </div>
    </div>
  );
};

export default Quiz;
