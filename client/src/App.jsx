import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './utils/auth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FindFriends from './pages/FindFriends';
import UpdateProfile from './pages/UpdateProfile';
import Profile from './pages/Profile';
import NewQuiz from './pages/NewQuiz'
import Quiz from './pages/Quiz';
import PasswordReset from './pages/PasswordReset';
import PasswordResetRequest from './pages/PasswordResetReq';
import './App.css';
import Donate from './pages/Donate';
import MainFeed from './pages/MainFeed';
import LeaderBoard from './components/LeaderBoard'




const PrivateRoute = ({ element }) => {
  return Auth.loggedIn() ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element }) => {
  return Auth.loggedIn() ? <Navigate to="/" /> : element;
};

const NotFoundRedirect = () => {
  return Auth.loggedIn() ? <Navigate to="/" /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/find-friends" element={<PrivateRoute element={<FindFriends />} />} />
        
        <Route path="/update-profile" element={<PrivateRoute element={<UpdateProfile />} />} />
        <Route path="/profile/:id" element={<PrivateRoute element={<Profile />} />} />
        
        <Route path="/quiz" element={<PrivateRoute element={<Quiz />} />} />
        <Route path="/new-quiz" element={<PrivateRoute element={<NewQuiz />} />} />

        <Route path="/messaging" element={<PrivateRoute element={<div>Messaging</div>} />} />
        <Route path="/password-reset" element={<PrivateRoute element={<PasswordReset />} />} />
        <Route path="/password-reset-request" element={<PublicRoute element={<PasswordResetRequest />} />} />
        <Route path="/feed" element={<PrivateRoute element={<MainFeed />} />} />
        <Route path="/donate" element={<PrivateRoute element={<Donate />} />} />
        <Route path="/leaderboard" element={<PrivateRoute element={<LeaderBoard />} />} />

        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
