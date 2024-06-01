import { useState } from 'react';
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
  const [errorMessage, setErrorMessage] = useState('');

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
    } catch (err) {
      console.log(err.message);
      let errorMessage = 'An unexpected error occurred.';
      if (err.message.includes('An account with this email already exists.')) {
        errorMessage = 'An account with this email already exists.';
      } else if (err.message.includes('User validation failed')) {
        errorMessage = 'Invalid user information. Please check your inputs.';
      } else if (err.message.includes('No user found with this email address')) {
        errorMessage = 'No user found with this email address.';
      } else if (err.message.includes('Incorrect credentials')) {
        errorMessage = 'Incorrect email or password.';
      } else if (err.networkError) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        errorMessage = 'Server error. Please try again later.';
      }
      setErrorMessage(errorMessage);
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
              <p className={styles.errorMessage}>{errorMessage}</p>
            </div>
          ) : null}
          <button type="submit" className={styles.button}>{isSignup ? 'Sign Up' : 'Login'}</button><br/>
          <button className={styles.button} onClick={() => navigate('/password-reset-request')}>
          Forgot my password
          </button>
        </form>
        <button className={styles.toggleButton} onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
        </button>
      </div>

    </div>
  );
};

export default Landing;
