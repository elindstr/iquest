// TODO: fix error msg:
// Warning: Cannot update a component (`QuizBoard`) while rendering a different component (`Timer`). To locate the bad setState() call inside `Timer`, follow the stack trace as described in 

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_QUIZ, SCORE_QUIZ } from '../utils/mutations';
import Auth from '../utils/auth';
import './Quiz.css';
import Score from './Score';
import Timer from './Timer';

const QuizBoard = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [questionTimer, setQuestionTimer] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [quizId, setQuizId] = useState(null);

  const [addQuiz] = useMutation(ADD_QUIZ);
  const [scoreQuiz] = useMutation(SCORE_QUIZ);
  const userId = Auth.getProfile().data._id;

  useEffect(() => {
    const fetchQuizData = async () => {
      const quizAmount = 10;        // Hard-coded here
      const quizDifficulty = "any"; // Hard-coded here
      const quizCategory = "any";   // Hard-coded here

      let difficultyParam = "";
      if (quizDifficulty !== "any") {
        difficultyParam = `&difficulty=${quizDifficulty}`;
      }
      let categoryParam = "";
      if (quizCategory !== "any") {
        categoryParam = `&category=${quizCategory}`;
      }
      const apiUrl = `https://opentdb.com/api.php?amount=${quizAmount}${difficultyParam}${categoryParam}`;
      //console.log("API:", apiUrl);
      
      try {
        const response = await fetch(apiUrl);
        const triviaAPIData = await response.json();

        if (triviaAPIData?.response_code !== 0) {
          throw new Error(`API error: ${triviaAPIData.response_code}`);
        }
        setQuizData(triviaAPIData);

        const addQuizMutationResponse = await addQuiz({ variables: { user: userId, apiLink: apiUrl, difficulty: quizDifficulty, percentCorrect: 0 } });
        setQuizId(addQuizMutationResponse.data.addQuiz._id);
        //console.log(addQuizMutationResponse);

      } catch (err) {
        console.log('Error fetching quiz data:', err);
      }
    };

    fetchQuizData();
  }, [addQuiz, userId]);

  useEffect(() => {
    if (currentQuestionIndex >= quizData?.results?.length && quizId) {
      const saveResults = async () => {
        const percentCorrect = score / quizData.results.length;
        const scoreQuizMutationResponse = await scoreQuiz({ variables: { _id: quizId, percentCorrect } });
        //console.log(scoreQuizMutationResponse);
      };

      saveResults();
    }
  }, [currentQuestionIndex, quizData, score, scoreQuiz, quizId]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === quizData.results[currentQuestionIndex].correct_answer;
    setIsTimerRunning(false);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleTimerEnd = () => {
    setSelectedAnswer("TIME_UP");
    setIsTimerRunning(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setQuestionTimer(10);
    setIsTimerRunning(true);
  };

  if (!quizData) {
    return <p>Loading...</p>;
  }

  if (quizData.response_code > 0) {
    console.log(`Sorry, something went wrong loading the quiz. Try again in a few seconds. Error code: ${quizData.response_code}`);

    return (
      <>
        <p>Sorry, something went wrong loading the quiz. Try again in a few seconds.</p>
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </>
    );
  }

  if (currentQuestionIndex >= quizData.results.length) {
    const percentCorrect = (score / quizData.results.length) * 100;

    return (
      <div>
        <h2>Quiz Complete!</h2>
        <p>You scored {score} out of {quizData.results.length}: {percentCorrect.toFixed(2)}%</p>
        <p>Adjusted IQ: [TODO].</p>
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    );
  }

  const currentQuestion = quizData.results[currentQuestionIndex];
  let answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  answers = answers.sort(() => Math.random() - 0.5);

  return (
    <div className="quiz-board">
      <h2>Quiz Board</h2>
      <p>Question {currentQuestionIndex + 1} of {quizData.results.length}</p>
      <Score score={score} totalQuestions={quizData.results.length} />
      <Timer key={currentQuestionIndex} initialTime={questionTimer} onTimerEnd={handleTimerEnd} isRunning={isTimerRunning} />
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
            Next
          </button>
        )}
      </div>
      {selectedAnswer === "TIME_UP" && (
        <div className="correct-answer">
          <p>The correct answer was: <strong>{currentQuestion.correct_answer}</strong></p>
        </div>
      )}
    </div>
  );
};

export default QuizBoard;