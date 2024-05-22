const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const bcrypt = require('bcrypt');
const { signToken, AuthenticationError } = require('../utils/auth');
const { User, Quiz } = require('../models');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom scalar type for Date',
  serialize(value) {
    return value instanceof Date ? value.toISOString() : null;
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

const resolvers = {
  Date: dateScalar,

  Query: {
    users: async (parent, args, context) => {
      if (context.user) {
        return await User.find();
      }
      throw new AuthenticationError('Not authenticated');
    },
    user: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findById(_id);
      }
      throw new AuthenticationError('Not authenticated');
    },
    quizes: async (parent, args, context) => {
      if (context.user) {
        return await Quiz.find();
      }
      throw new AuthenticationError('Not authenticated');
    },
  },

  Mutation: {
    addQuiz: async (parent, args, context) => {
      if (context.user) {
        const quiz = await Quiz.create(args);
        return quiz;
      }
      throw new AuthenticationError('Not authenticated');
    },
    scoreQuiz: async (parent, { _id, percentCorrect }, context) => {
      if (context.user) {
        const updateData = { percentCorrect };

        const updatedQuiz = await Quiz.findByIdAndUpdate(
          _id,
          updateData,
          { new: true }
        );
        return updatedQuiz;
      }
      throw new AuthenticationError('Not authenticated');
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { friends: friendId } },
          { new: true }
        );
      }
      throw new AuthenticationError('Not authenticated');
    },
    unFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { friends: friendId } },
          { new: true }
        );
      }
      throw new AuthenticationError('Not authenticated');
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, { _id, password, firstName, lastName, email, profilePictureURL, profileBio, iq }, context) => {
      if (context.user) {
        const updateData = { firstName, lastName, email, profilePictureURL, profileBio, iq };

        if (password) {
          const saltRounds = 10;
          updateData.password = await bcrypt.hash(password, saltRounds);
        }

        const updatedUser = await User.findByIdAndUpdate(
          _id,
          updateData,
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('Not authenticated');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
