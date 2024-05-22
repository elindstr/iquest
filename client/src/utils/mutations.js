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

export const UPDATE_USER = gql`
  mutation updateUser(
    $_id: ID!
    $password: String
    $email: String
    $firstName: String
    $lastName: String
    $profilePictureURL: String
    $profileBio: String
    $iq: Float
  ) {
    updateUser(
      _id: $_id
      password: $password
      email: $email
      firstName: $firstName
      lastName: $lastName
      profilePictureURL: $profilePictureURL
      profileBio: $profileBio
      iq: $iq
    ) {
      _id
      email
      firstName
      lastName
      profilePictureURL
      profileBio
      iq
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      _id
      email
      firstName
      lastName
      profilePictureURL
      profileBio
      friends {
        _id
        email
        firstName
        lastName
        profilePictureURL
      }
    }
  }
`;

export const UN_FRIEND = gql`
  mutation unFriend($friendId: ID!) {
    unFriend(friendId: $friendId) {
      _id
      email
      firstName
      lastName
      profilePictureURL
      profileBio
      friends {
        _id
        email
        firstName
        lastName
        profilePictureURL
      }
    }
  }
`;

export const ADD_QUIZ = gql`
  mutation addQuiz(
    $user: ID!
    $apiLink: String
    $difficulty: String
    $percentCorrect: Float
  ) {
    addQuiz(
      user: $user
      apiLink: $apiLink
      difficulty: $difficulty
      percentCorrect: $percentCorrect
    ) {
      _id
    }
  }
`;

export const SCORE_QUIZ = gql`
  mutation scoreQuiz(
    $_id: ID!
    $percentCorrect: Float!
  ) {
    scoreQuiz(
      _id: $_id
      percentCorrect: $percentCorrect
    ) {
      _id
      percentCorrect
    }
  }
`;
