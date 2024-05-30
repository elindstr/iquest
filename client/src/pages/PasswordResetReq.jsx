import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const PASSWORD_RESET_REQUEST = gql`
  mutation PasswordResetRequest($email: String!) {
    passwordResetRequest(email: $email){
      message
    }
  }
`;

function PasswordResetRequest() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [passwordResetRequest, { data, loading, error }] = useMutation(PASSWORD_RESET_REQUEST, {
    onCompleted: (data) => {
      setMessage(data.passwordResetRequest);
    },
    onError: (error) => {
      setMessage('An error occurred while trying to send the password reset request');
    },
  });

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/request-password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('An error occurred while trying to send the password reset request');
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
    // navigate('/password-reset');  Navigate to password reset page
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Send Password Reset Request</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PasswordResetRequest;