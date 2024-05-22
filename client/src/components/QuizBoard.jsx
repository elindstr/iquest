import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTriviaAPI } from '../actions/actions';
import './Quiz.css';
import { Score } from './Score';


const QuizBoard = () => {
  const dispatch = useDispatch();
  const { triviaData } = useSelector((state) => state.game);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTriviaAPI());
  }, [dispatch]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === triviaData.results[currentQuestionIndex].correct_answer;
    setIsAnswerCorrect(isCorrect);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  if (!triviaData) {
    return <p>Loading...</p>;
  }

  if (triviaData.response_code > 0) {
    return (
      <>
        <p>Sorry something went wrong loading the quiz. Try again in a few seconds.</p>
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </>
    )
  }

  if (currentQuestionIndex >= triviaData.results.length) {
    return (
      <div>
        <h2>Quiz Complete!</h2>
        <p>You scored {score} out of {triviaData.results.length}</p>
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    );
  }

  const currentQuestion = triviaData.results[currentQuestionIndex];
  let answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  answers = answers.sort(() => Math.random() - 0.5);

  return (
    <div className="quiz-board">
      <h2>Quiz Board</h2>
      <p>Question {currentQuestionIndex + 1} of {triviaData.results.length}</p>
      <div className="question-container">
        <h3 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
        <div className="answers-container">
          {answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              style={{ backgroundColor: selectedAnswer ? (answer === currentQuestion.correct_answer ? 'green' : selectedAnswer === answer ? 'red' : '') : '' }}
              disabled={!!selectedAnswer}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          ))}
        </div>
        {selectedAnswer && (
          <button className="next-question" onClick={handleNextQuestion}>
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizBoard;
