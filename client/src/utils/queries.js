import { gql } from '@apollo/client';

// Query for fetching a specific user by ID
export const QUERY_USER = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      email
      firstName
      lastName
      profilePictureURL
      profileBio
      iq
      friends {
        _id
        email
        firstName
        lastName
        profilePictureURL
        profileBio
        iq
      }
    }
  }
`;

// Query for fetching all users
export const QUERY_USERS = gql`
  query users {
    users {
      _id
      email
      firstName
      lastName
      profilePictureURL
      profileBio
      iq
      friends {
        _id
        email
        firstName
        lastName
        profilePictureURL
        profileBio
        iq
      }
    }
  }
`;

// Query for fetching all quizes
export const QUERY_QUIZES = gql`
  query quizes {
    quizes {
      _id
      date
      user {
        _id
        email
        firstName
        lastName
        profilePictureURL
        profileBio
        iq
        friends {
          _id
        }
      }
      apiLink
      difficulty
      percentCorrect
    }
  }
`;
