import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const PASSWORD_RESET = gql`
  mutation PasswordReset($token: String!, $password: String!) {
    passwordReset(token: $token, password: $password)
  }
`;

function PasswordReset() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [passwordReset, { data, loading, error }] = useMutation(PASSWORD_RESET, {
    onCompleted: (data) => {
      setMessage(data.passwordReset);
    },
    onError: (error) => {
      setMessage('An error occurred while trying to reset the password');
    },
  });

  const handleTokenChange = (event) => {
    console.log(token);
    setToken(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(token, password);
    passwordReset({ variables: { token, password } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="token"
          placeholder="Token"
          value={token}
          onChange={handleTokenChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PasswordReset;