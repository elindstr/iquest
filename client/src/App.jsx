import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './utils/auth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FindFriends from './pages/FindFriends';
import UpdateProfile from './pages/UpdateProfile';
import Profile from './pages/Profile';
import Quiz from './pages/Quiz';
<<<<<<< HEAD
import PasswordReset from './pages/PasswordReset';
import PasswordResetRequest from './pages/PasswordResetReq';
=======
import './App.css'
import Donate from './pages/Donate'
import MainFeed from './pages/MainFeed';
import LeaderBoard from './components/LeaderBoard'

>>>>>>> 99d1bad8881815bfd16b9684f095e8d38a0651f1

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
<<<<<<< HEAD
        <Route path="/messaging" element={<PrivateRoute element={<div>Messaging</div>} />} />
        <Route path="/password-reset" element={<PrivateRoute element={<PasswordReset />} />} />
        <Route path="/password-reset-request" element={<PublicRoute element={<PasswordResetRequest />} />} />
=======
        <Route path="/feed" element={<PrivateRoute element={<MainFeed />} />} />
        <Route path="/donate" element={<PrivateRoute element={<Donate />} />} />
        <Route path="/leaderboard" element={<PrivateRoute element={<LeaderBoard />} />} />
>>>>>>> 99d1bad8881815bfd16b9684f095e8d38a0651f1

        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
