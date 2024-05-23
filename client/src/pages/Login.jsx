import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN, ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import styles from './Login.module.css';

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
    <div className={styles.landingPage}>
      <div className={styles.card}>
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
                className={styles.input}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formState.lastName}
                onChange={handleInputChange}
                required
                className={styles.input}
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
            className={styles.input}
          />
            <div className={styles.inputContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formState.password}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={toggleShowPassword}
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </div>
          {loginError || signupError ? (
            <div>
              <p className={styles.errorMessage}>The provided credentials are incorrect</p>
            </div>
          ) : null}
          <button type="submit" className={styles.button}>{isSignup ? 'Sign Up' : 'Login'}</button>
        </form>
        <button className={styles.toggleButton} onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default Landing;
