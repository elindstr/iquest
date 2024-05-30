import React from 'react';
import QuizBoard from '../components/QuizBoard';
import styles from '../components/Quiz.module.css';

const NewQuiz = () => {
  return (
    <div className={styles.quizPage}>
        <QuizBoard />
    </div>
  );
};

export default NewQuiz;
