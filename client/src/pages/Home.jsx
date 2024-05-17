import { Link } from 'react-router-dom';
import QuizSettings from '../components/QuizSettings';

const Home = () => {
  return (
    <>
      <div className="container">
        <h1>Welcome to iQuest</h1>

        <Link to="/quiz">Start Quiz</Link>
        
        <br /> <br /> <br /> <br /> <hr />
        <div>Hidden values we can control in background:</div>
        <QuizSettings />
        
      </div>
    </>
  );
};

export default Home;
