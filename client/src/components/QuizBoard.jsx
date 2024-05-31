import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SCORE_QUIZ, UPDATE_USER } from '../utils/mutations';

import getNewIQ from './getNewIQ';
import Score from './Score';
import styles from './Quiz.module.css';

// for displaying raw html in some quiz answers 
const escapeHTML = (html) => {
  const div = document.createElement('div');
  div.innerText = html;
  return div.innerHTML;
};

// main component function
const QuizBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { triviaData, quizId, userId, userData } = location.state; // get values passed from NewQuiz page

  console.log(triviaData)
  console.log(quizId)
  console.log(userId)
  console.log(userData)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [newIQ, setNewIQ] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [scoreQuiz] = useMutation(SCORE_QUIZ);
  const [updateUser] = useMutation(UPDATE_USER);

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning) return;

    const countdown = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 1) {
          return prevTimeLeft - 1;
        } else {
          clearInterval(countdown);
          handleTimerEnd();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [isTimerRunning]);

  // Get next question
  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setIsTimerRunning(true);
    setTimeLeft(15);
  };

  // Set current question and shuffle answers
  useEffect(() => {
    if (triviaData && triviaData.results && triviaData.results[currentQuestionIndex]) {
      const currentQuestion = triviaData.results[currentQuestionIndex];
      const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
      setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
      setCurrentQuestion(currentQuestion);
    }
  }, [currentQuestionIndex, triviaData]);

  // Handle answer click
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === triviaData.results[currentQuestionIndex].correct_answer;
    setIsTimerRunning(false);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  // Handle timer lapse
  const handleTimerEnd = () => {
    setSelectedAnswer('TIME_UP');
    setIsTimerRunning(false);
  };

  // Actions to run when quiz is completed
  useEffect(() => {
    if (isQuizComplete) {
      const percentCorrect = score / triviaData.results.length;

      const saveResults = async () => {
        try {          
          await scoreQuiz({ variables: { _id: quizId, count: currentQuestionIndex, percentCorrect } });
        } catch (error) {
          console.error('Error saving quiz results:', error);
        }
      };
      saveResults();

      const updateIQ = async () => {
        if (!userData) return;
        let userIQ = userData.user.iq;
        if (!userIQ || userIQ === 0) userIQ = 120; // Handle null IQ
        const newIQ = getNewIQ(userIQ, percentCorrect);
        try {
          await updateUser({ variables: { _id: userId, iq: newIQ } });
          setNewIQ(newIQ);
        } catch (error) {
          console.error('Error updating IQ:', error);
        }
      };
      updateIQ();
    }
  }, [isQuizComplete, triviaData, score, quizId, currentQuestionIndex, scoreQuiz, updateUser, userData, userId]);

  // Display load message until quiz data is loaded
  if (!triviaData) {
    return (
      <>
        <p>Loading...</p>
        <p>
          <button onClick={() => navigate('/')}>Back to Dashboard</button>
        </p>
      </>
    );
  }

  // Handle quiz completion
  if (currentQuestionIndex >= triviaData.results.length && !isQuizComplete) {
    setIsQuizComplete(true);
  }

  // Render completion screen if quiz is complete
  if (isQuizComplete) {
    const percentCorrectDisplay = ((score / triviaData.results.length) * 100).toFixed(2);
    return (
      <div className={styles.quizPage}>
        <div className={styles.card}>
          <h2>Quiz Complete!</h2>
          <p>
            You scored {score} out of {triviaData.results.length}: {percentCorrectDisplay}%
          </p>
          <p>New IQ: {newIQ ? newIQ.toFixed(0) : null}</p>
          <br />
          <button onClick={() => navigate('/new-quiz')}>New Quiz</button> <br />
          <button onClick={() => navigate('/')}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  // Main return
  return (
    <div className={styles.quizPage}>
      <div className={styles.card}>
        <h2>Quiz Board</h2>

        <p>
          Question {currentQuestionIndex + 1} of {triviaData.results.length}
        </p>
        <Score score={score} totalQuestions={triviaData.results.length} />
        <div>
          <h2>Seconds left: {timeLeft}</h2>
        </div>

        <div className={styles.questionContainer}>
          {currentQuestion && (
            <>
              <h3 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

              <div className={styles.answersContainer}>
                {shuffledAnswers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(answer)}
                    className={styles.answerButton}
                    style={{
                      backgroundColor: selectedAnswer
                        ? answer === currentQuestion.correct_answer
                          ? 'green'
                          : selectedAnswer === answer
                          ? 'red'
                          : ''
                        : '',
                    }}
                    disabled={!!selectedAnswer}
                    dangerouslySetInnerHTML={{ __html: escapeHTML(answer) }}
                  />
                ))}
              </div>
              {selectedAnswer && selectedAnswer !== 'TIME_UP' && (
                <button className={styles.nextQuestionButton} onClick={handleNextQuestion}>
                  Next
                </button>
              )}
              {selectedAnswer === 'TIME_UP' && (
                <div className={styles.correctAnswer}>
                  <p>
                    The correct answer was: <strong dangerouslySetInnerHTML={{ __html: escapeHTML(currentQuestion.correct_answer) }} />
                  </p>
                  <button className={styles.nextQuestionButton} onClick={handleNextQuestion}>
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizBoard;
