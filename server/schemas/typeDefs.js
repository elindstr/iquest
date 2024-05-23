const typeDefs = `
  scalar Date

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

  type Quiz {
    _id: ID
    date: Date
    user: User
    difficulty: String
    count: Int
    category: String
    percentCorrect: Float
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    quizes: [Quiz]
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
    addQuiz(user: ID!, difficulty: String, count: Int, category: String, percentCorrect: Float): Quiz
    scoreQuiz(_id: ID!, count: Int, percentCorrect: Float!): Quiz
  }
`;

module.exports = typeDefs;
