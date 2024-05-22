import React from 'react';

const Score = ({ score, totalQuestions }) => {
  return (
    <div className="score-container">
      <p>Correct answers: {score}/{totalQuestions}</p>
    </div>
  );
};

export default Score;