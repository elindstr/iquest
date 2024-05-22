import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTriviaAPI } from '../actions/actions';
import './Quiz.css';
import Score from './Score';
import Timer from './Timer';


const QuizBoard = () => {
  const dispatch = useDispatch();
  const { apiInputs, triviaData } = useSelector((state) => state.game);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [questionTimer, setQuestionTimer] = useState(10);

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
    setQuestionTimer(10);
  };

  const handleTimerEnd = () => {
    const currentQuestion = triviaData.results[currentQuestionIndex];
    const correctAnswer = currentQuestion.correct_answer;
    const incorrectAnswers = currentQuestion.incorrect_answers;
    const randomIncorrectAnswer = incorrectAnswers.find(answer => answer !== correctAnswer);

    setSelectedAnswer(randomIncorrectAnswer);
    setIsAnswerCorrect(false);
  }

  if (!triviaData) {
    return <p>Loading...</p>;
  }

  // quiz error code
  if (triviaData.response_code > 0) {
    return (
      <>
        <p>Sorry something went wrong loading the quiz. Try again in a few seconds.</p>
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </>
    )
  }


  // quiz ended: record results to db and render results component
  if (currentQuestionIndex >= triviaData.results.length) {

    const user = User
    const difficulty = apiInputs.difficulty
    // const apiLink  // $apiLink: String
    const percentCorrect = score / triviaData.results.length


    return (
      <div>
        <h2>Quiz Complete!</h2>
        <p>You scored {score} out of {triviaData.results.length}</p>
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    );
  }

  // get next question and answers
  const currentQuestion = triviaData.results[currentQuestionIndex];
  let answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  answers = answers.sort(() => Math.random() - 0.5);

  // main quiz return
  return (
    <div className="quiz-board">
      <h2>Quiz Board</h2>
      <p>Question {currentQuestionIndex + 1} of {triviaData.results.length}</p>
      <Score score={score} totalQuestions={triviaData.results.length} />
      <Timer key={currentQuestionIndex} initialTime={questionTimer} onTimerEnd={handleTimerEnd} />
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
