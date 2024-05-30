const typeDefs = `
  scalar Date

  type DailyLogin {
    _id: ID
    date: Date
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    profilePictureURL: String
    profileBio: String
    friends: [User]
    iq: Float
    dailyLogins: [DailyLogin]
  }

  type Comment {
    _id: ID
    user: User
    commentText: String
    createdAt: Date
  }

  type Quiz {
    _id: ID
    date: Date
    user: User
    difficulty: String
    count: Int
    category: String
    percentCorrect: Float
    comments: [Comment]
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
<<<<<<< HEAD
    requestPasswordReset(email: String!): Message
    resetPassword(token: String!, newPassword: String!): Message
  }
  type Message {
    message: String
=======
    addQuiz(user: ID!, difficulty: String, count: Int, category: String, percentCorrect: Float): Quiz
    scoreQuiz(_id: ID!, count: Int, percentCorrect: Float!): Quiz
    addQuizComment(_id: ID!, userId: ID!, commentText: String!): Quiz
    recordLogin(userId: ID!): User
>>>>>>> 99d1bad8881815bfd16b9684f095e8d38a0651f1
  }
`;

module.exports = typeDefs;
