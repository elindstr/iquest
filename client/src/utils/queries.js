import { gql } from '@apollo/client';

// Query for fetching a specific user by ID
export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(_id: $userId) {
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
