import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADD_QUIZ, SCORE_QUIZ, UPDATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import styles from './Quiz.module.css';

import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import getNewIQ from './getNewIQ';
import Score from './Score';

const QuizBoard = () => {
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
 
  const [score, setScore] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [newIQ, setNewIQ] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);

  const [addQuiz] = useMutation(ADD_QUIZ);
  const [scoreQuiz] = useMutation(SCORE_QUIZ);
  const [updateUser] = useMutation(UPDATE_USER);

  // get User ID and query user data
  const userId = Auth.getProfile().data._id;
  const { data: userData, loading, error } = useQuery(QUERY_USER, { variables: { _id: userId } });

  // fetch quiz data
  const fetchQuizData = async () => {
    // quiz parameters
    const quizAmount = 10; // Hard-coded here
    const quizDifficulty = "easy"; // Hard-coded here (easy, medium, hard)
    const quizCategory = "any"; // Hard-coded here
    const quizType = "multiple";

    const difficultyParam = quizDifficulty !== "any" ? `&difficulty=${quizDifficulty}` : "";
    const categoryParam = quizCategory !== "any" ? `&category=${quizCategory}` : "";
    const typeParam = quizType !== "any" ? `&type=${quizType}` : "";
    const apiUrl = `https://opentdb.com/api.php?amount=${quizAmount}${difficultyParam}${categoryParam}${typeParam}`;

    // call api
    const response = await fetch(apiUrl);
    const triviaAPIData = await response.json();

    if (triviaAPIData?.response_code !== 0) {
      throw new Error(`API error: ${triviaAPIData.response_code}`);
    }

    // store quiz data in local state
    setQuizData(triviaAPIData);

    // save quiz data to db
    const addQuizMutationResponse = await addQuiz({
      variables: {
        user: userId,
        category: quizCategory,
        difficulty: quizDifficulty,
        count: quizAmount,
        percentCorrect: 0
      }
    });
    setQuizId(addQuizMutationResponse.data.addQuiz._id);
  };

  // fetch quiz data on load only
  useEffect(() => {
    fetchQuizData();
  }, []);

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

  // get next question
  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setIsTimerRunning(true);
    setTimeLeft(15);
  };

  useEffect(() => {
    if (quizData && quizData.results && quizData.results[currentQuestionIndex]) {
      const currentQuestion = quizData.results[currentQuestionIndex];
      const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
      setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
      setCurrentQuestion(currentQuestion);
    }
  }, [currentQuestionIndex, quizData]);

  // handle answer
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === quizData.results[currentQuestionIndex].correct_answer;
    setIsTimerRunning(false);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  // handle timer lapse
  const handleTimerEnd = () => {
    setSelectedAnswer("TIME_UP");
    setIsTimerRunning(false);
  };

  // actions to run when quiz is completed
  useEffect(() => {
    if (isQuizComplete) {
      const percentCorrect = (score / quizData.results.length);
  
      // save to db
      const saveResults = async () => {
        await scoreQuiz({ variables: { _id: quizId, count: currentQuestionIndex, percentCorrect } });
      };
      saveResults();

      // update iq
      const updateIQ = async () => {
        if (!userData) return;
        let userIQ = userData.user.iq;
        if (!userIQ || userIQ === 0) userIQ = 120;  // handle null iq
        const newIQ = getNewIQ(userIQ, percentCorrect);
        await updateUser({ variables: { _id: userId, iq: newIQ } });
        setNewIQ(newIQ)
      };
      updateIQ();
    }
  }, [isQuizComplete]);

  // display load message until quiz data is loaded
  if (!quizData) {
    return (
      <>
        <p>Loading...</p>
        <p>
          <button onClick={() => navigate('/')}>Back to Dashboard</button>
        </p>
      </>
    );
  }

  // handle error code
  if (quizData.response_code > 0) {
    const timer = setTimeout(() => {
      fetchQuizData();
    }, 5100);

    return () => clearTimeout(timer);
  }

  // handle quiz completion
  if (currentQuestionIndex >= quizData.results.length && !isQuizComplete) {
    setIsQuizComplete(true);
  }

  // render completion screen if quiz is complete
  if (isQuizComplete) {
    const percentCorrectDisplay = ((score / quizData.results.length) * 100).toFixed(2);
    return (
      <div className={styles.quizPage}>
        <div className={styles.card}>
          <h2>Quiz Complete!</h2>
          <p>You scored {score} out of {quizData.results.length}: {percentCorrectDisplay}%</p>
          <p>New IQ: {newIQ ? newIQ.toFixed(2) : null}</p>
          <br/>
          <button onClick={() => navigate('/')}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  // main return
  return (
    <div className={styles.quizPage}>
      <div className={styles.card}>
        <h2>Quiz Board</h2>

        <p>Question {currentQuestionIndex + 1} of {quizData.results.length}</p>
        <Score score={score} totalQuestions={quizData.results.length} />
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
                    style={{ backgroundColor: selectedAnswer ? (answer === currentQuestion.correct_answer ? 'green' : selectedAnswer === answer ? 'red' : '') : '' }}
                    disabled={!!selectedAnswer}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />
                ))}
              </div>
              {selectedAnswer && selectedAnswer !== "TIME_UP" && (
                <button className={styles.nextQuestionButton} onClick={handleNextQuestion}>
                  Next
                </button>
              )}
              {selectedAnswer === "TIME_UP" && (
                <div className={styles.correctAnswer}>
                  <p>The correct answer was: <strong dangerouslySetInnerHTML={{ __html: currentQuestion.correct_answer }} /></p>
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
