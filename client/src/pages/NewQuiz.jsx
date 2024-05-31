import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { ADD_QUIZ } from '../utils/mutations';

import styles from '../components/Quiz.module.css';
import Auth from '../utils/auth';
import bootcampTrivia from '../trivia_data/index' 

const NewQuiz = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('99');
  const [categoryName, setCategoryName] = useState('Fullstack Web Dev Bootcamp');
  const [addQuiz] = useMutation(ADD_QUIZ);

  // preload user data
  const userId = Auth.getProfile().data._id;
  const { data: userData } = useQuery(QUERY_USER, { variables: { _id: userId } });

  // handle button
  const handleStartQuiz = async () => {
    const quizAmount = 10; // Hard-coded here
    const quizDifficulty = ''; // Hard-coded here (easy, medium, hard)
    const quizType = 'multiple';
    let triviaAPIData = []

    // bootcamp curriculum
    if (category === '99') {
      const shuffledData = bootcampTrivia.results.sort(() => 0.5 - Math.random());
      triviaAPIData = {
        response_code: 0,
        results: shuffledData.slice(0, quizAmount),
      };
    } 

    // trivia api
    else {
      const difficultyParam = quizDifficulty !== 'any' ? `&difficulty=${quizDifficulty}` : '';
      const categoryParam = category !== 'any' ? `&category=${category}` : '';
      const typeParam = quizType !== 'any' ? `&type=${quizType}` : '';
      const apiUrl = `https://opentdb.com/api.php?amount=${quizAmount}${difficultyParam}${categoryParam}${typeParam}`;

      const response = await fetch(apiUrl);
      triviaAPIData = await response.json();
      if (triviaAPIData?.response_code !== 0) {
        console.error(`API load error: ${triviaAPIData.response_code}.`);
        return;
      }
    }

    // Save quiz data to the database
    const response = await addQuiz({
      variables: {
        user: userId,
        category: categoryName || 'any',
        difficulty: quizDifficulty || 'any',
        count: quizAmount,
        percentCorrect: 0,
      },
    });
    const quizId = response.data.addQuiz._id

    // redirect with triviaData passed as state
    navigate('/quiz', { state: { 
      triviaData: triviaAPIData,
      quizId: quizId,
      userId,
      userData
    } });
  };

  return (
    <div className={styles.quizPage}>
      <div className={styles.card}>
        <h2>Select Quiz Category</h2>
        <select value={category} onChange={
          (e) => {
            setCategory(e.target.value);
            const selectedOption = e.target.options[e.target.selectedIndex];
            setCategoryName(selectedOption.text);
            }
          }>
          <option value="99">Fullstack Web Dev Bootcamp</option>
          <option value="any">Any Trivia</option>
          <option value="27">Animals</option>
          <option value="25">Art</option>
          <option value="11">Entertainment: Film</option>
          <option value="10">Entertainment: Books</option>
          <option value="31">Entertainment: Japanese Anime & Manga</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="29">Entertainment: Comics</option>
          <option value="32">Entertainment: Cartoon & Animations</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals & Theatres</option>
          <option value="22">Geography</option>
          <option value="9">General Knowledge</option>
          <option value="23">History</option>
          <option value="20">Mythology</option>
          <option value="24">Politics</option>
          <option value="18">Science: Computers</option>
          <option value="30">Science: Gadgets</option>
          <option value="19">Science: Mathematics</option>
          <option value="17">Science & Nature</option>
          <option value="21">Sports</option>
          <option value="28">Vehicles</option>
          <option value="26">Celebrities</option>
        </select>

        <button className={styles.button} onClick={handleStartQuiz}>Start Quiz</button> <br />
        <button className={styles.button} onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default NewQuiz;
