import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation AddFriend($userId: ID!, $friendId: ID!) {
    addFriend(userId: $userId, friendId: $friendId) {
      token
      user {
        _id
        email
      }
    }
  }
`;
export const UNFRIEND_USER = gql`
  mutation UnFriend($userId: ID!, $friendId: ID!) {
    unFriend(userId: $userId, friendId: $friendId) {
      token
      user {
        _id
        email
      }
    }
  }
`;