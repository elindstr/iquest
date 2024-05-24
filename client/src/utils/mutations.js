// client...mutations.js
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
    $difficulty: String 
    $count: Int
    $category: String, 
    $percentCorrect: Float
  ) {
    addQuiz(
      user: $user
      difficulty: $difficulty 
      count: $count
      category: $category
      percentCorrect: $percentCorrect
    ) {
      _id
    }
  }
`;

export const SCORE_QUIZ = gql`
  mutation scoreQuiz(
    $_id: ID!
    $count: Int
    $percentCorrect: Float!
  ) {
    scoreQuiz(
      _id: $_id
      count: $count
      percentCorrect: $percentCorrect
    ) {
      _id
      count
      percentCorrect
    }
  }
`;

export const ADD_QUIZ_COMMENT = gql`
  mutation addQuizComment(
    $_id: ID!
    $userId: ID!
    $commentText: String!
  ) {
    addQuizComment(
      _id: $_id
      userId: $userId
      commentText: $commentText
    ) {
      _id
      comments {
        _id
        user {
          _id
          firstName
          lastName
        }
        commentText
        createdAt
      }
    }
  }
`;

export const RECORD_LOGIN = gql`
  mutation recordLogin($userId: ID!) {
    recordLogin(userId: $userId) {
      _id
      dailyLogins {
        _id
        date
      }
    }
  }
`;