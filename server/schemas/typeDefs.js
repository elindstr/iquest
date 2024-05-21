const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    profilePictureURL: String
    profileBio: String
    friends: [User]
    iq: Float
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID!): User
  }

  type Mutation {
    addFriend(friendId: ID!): User
    unFriend(friendId: ID!): User
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(
      _id: ID!
      password: String
      firstName: String
      lastName: String
      email: String
      profilePictureURL: String
      profileBio: String
      iq: Float
    ): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
