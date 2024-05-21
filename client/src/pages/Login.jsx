import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN, ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import './Login.css';

const Landing = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const navigate = useNavigate();

  const [login, { error: loginError }] = useMutation(LOGIN);
  const [addUser, { error: signupError }] = useMutation(ADD_USER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const mutationResponse = await addUser({
          variables: {
            email: formState.email,
            password: formState.password,
            firstName: formState.firstName,
            lastName: formState.lastName
          }
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
      } else {
        const mutationResponse = await login({
          variables: { email: formState.email, password: formState.password }
        });
        const token = mutationResponse.data.login.token;
        Auth.login(token);
      }
      console.log("redirecting to dashboard")
      navigate('/'); // Redirect to dashboard
    } catch (e) {
      console.log(e);
    }
  };

  const toggleShowPassword = () => { // New function to toggle password visibility
    setShowPassword(!showPassword);
  };

  return (
    <div className="landing-page">
      <div className="card">
        <h1>iQuest</h1>
        <form onSubmit={handleFormSubmit}>
          {isSignup && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formState.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formState.lastName}
                onChange={handleInputChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleInputChange}
            required
          />
            <div className="input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formState.password}
                onChange={handleInputChange}
                required
              />
              <label className="switch">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={toggleShowPassword}
                />
                <span className="slider round"></span>
              </label>
            </div>
          {loginError || signupError ? (
            <div>
              <p className="error-text">The provided credentials are incorrect</p>
            </div>
          ) : null}
          <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        </form>
        <button className="toggle-button" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default Landing
