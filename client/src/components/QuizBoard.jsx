import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTriviaAPI } from '../actions/actions';

const QuizBoard = () => {
  const dispatch = useDispatch();
  const { triviaData } = useSelector((state) => state.game);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [score, setScore] = useState(0);

  // On page load, this useEffect fetches trivia api using a function in '../actions/actions'. The fetched data is saved in redux state as state.game.triviaData.
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

  // early return for loading
  if (!triviaData) {
    return <p>Loading...</p>;
  } 

  // early return for fetch errors (todo: need to handle more gracefully)
  if (triviaData.response_code > 0) {
    return <p>Error...</p>;
  }

  // early return for quiz over (todo: need to save the results to user database)
  if (currentQuestionIndex >= triviaData.results.length) {
    return (
      <div>
        <h2>Quiz Complete!</h2>
        <p>You scored {score} out of {triviaData.results.length}</p>
      </div>
    );
  }

  // setup current question and answers
  const currentQuestion = triviaData.results[currentQuestionIndex];
  let answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  answers = answers.sort(() => Math.random() - 0.5);

  // main return
  return (
    <div>
      <h2>Quiz Board</h2>
      <p>Question {currentQuestionIndex + 1} of {triviaData.results.length}</p>
      <div>

        {/* 'dangerouslySetInnerHTML' is needed to format some special characters in the trivia api data */}
        <h3 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
        <div>

          {/* map answers as buttons; set background colors on correct/incorrect */}
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
          <button onClick={handleNextQuestion}>
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizBoard;
