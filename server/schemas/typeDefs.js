const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    profilePictureURL: String
    profileBio: String
    friends: [User]
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
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    requestPasswordReset(email: String!): Message
    resetPassword(token: String!, newPassword: String!): Message
  }
  type Message {
    message: String
  }
`;

module.exports = typeDefs;
