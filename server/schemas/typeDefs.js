const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
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
    addFriend(userId: ID!, friendId: ID!): Auth
    unFriend(userId: ID!, friendId: ID!): Auth
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
