import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_QUIZ, SCORE_QUIZ } from '../utils/mutations';
import Auth from '../utils/auth';
import styles from './Quiz.module.css';
import Score from './Score';
import Timer from './Timer';

const QuizBoard = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [quizId, setQuizId] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [loadingError, setLoadingError] = useState(false);

  const [addQuiz] = useMutation(ADD_QUIZ);
  const [scoreQuiz] = useMutation(SCORE_QUIZ);
  const userId = Auth.getProfile().data._id;

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
    
    try {
      const response = await fetch(apiUrl);
      const triviaAPIData = await response.json();

      if (triviaAPIData?.response_code !== 0) {
        throw new Error(`API error: ${triviaAPIData.response_code}`);
      }
      setQuizData(triviaAPIData);

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

    } catch (err) {
      console.log('Error fetching quiz data:', err);
      setLoadingError(true);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, [addQuiz, userId]);

  useEffect(() => {
    if (currentQuestionIndex > 0 && quizId) {
      const saveResults = async () => {
        const percentCorrect = score / quizData.results.length;
        await scoreQuiz({ variables: { _id: quizId, count: currentQuestionIndex, percentCorrect } });
      };

      saveResults();
    }
  }, [currentQuestionIndex, quizData, score, scoreQuiz, quizId]);

  useEffect(() => {
    if (quizData && quizData.results[currentQuestionIndex]) {
      const currentQuestion = quizData.results[currentQuestionIndex];
      const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
      setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
    }
  }, [currentQuestionIndex, quizData]);

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
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setIsTimerRunning(true);
  };

  useEffect(() => {
    if (loadingError) {
      const timer = setTimeout(() => {
        setLoadingError(false);
        fetchQuizData();
      }, 5100);

      return () => clearTimeout(timer);
    }
  }, [loadingError]);

  if (!quizData) {
    return <p>Loading...</p>;
  }

  if (quizData.response_code > 0 || loadingError) {
    return (
      <div className={styles.quizPage}>
        <p>Sorry, something went wrong loading the quiz. Retrying in a few seconds...</p>
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    );
  }

  if (currentQuestionIndex >= quizData.results.length) {
    const percentCorrect = (score / quizData.results.length) * 100;

    return (
      <div className={styles.quizPage}>
        <div className={styles.card}>
          <h2>Quiz Complete!</h2>
          <p>You scored {score} out of {quizData.results.length}: {percentCorrect.toFixed(2)}%</p>
          <button onClick={() => navigate('/')}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizData.results[currentQuestionIndex];

  return (
    <div className={styles.quizPage}>
      <div className={styles.card}>
        <h2>Quiz Board</h2>
        <p>Question {currentQuestionIndex + 1} of {quizData.results.length}</p>
        <Score score={score} totalQuestions={quizData.results.length} />
        <Timer key={currentQuestionIndex} initialTime={15} onTimerEnd={handleTimerEnd} isRunning={isTimerRunning} />
        <div className={styles.questionContainer}>
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
        </div>
      </div>
    </div>
  );
};

export default QuizBoard;
