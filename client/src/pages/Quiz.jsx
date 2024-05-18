import React from 'react';
import QuizBoard from '../components/QuizBoard';
import '../components/Quiz.css';

const Quiz = () => {
  return (
    <div className="quiz-page">
      <div className="card">
        <QuizBoard />
      </div>
    </div>
  );
};

export default Quiz;