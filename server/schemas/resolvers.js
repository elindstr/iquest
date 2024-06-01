const { User, Quiz } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const { GraphQLError } = require('graphql');
const { UserInputError, AuthenticationError } = require('apollo-server-errors');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const bcrypt = require('bcrypt');

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
        return await User.find().populate('friends');
      }
      throw new AuthenticationError('Not authenticated');
    },
    user: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findById(_id).populate('friends');
      }
      throw new AuthenticationError('Not authenticated');
    },
    quizes: async (parent, args, context) => {
      if (context.user) {
        return await Quiz.find().populate('user').populate({
          path: 'comments.user',
          select: 'firstName lastName profilePictureURL'
        });
      }
      throw new AuthenticationError('Not authenticated');
    },
    userPs: async (parent, args, context) => {
      if (context.user) {
        const userPs = await UserPs.findById(context.user._id)
        return userPs;
      }
      throw new AuthenticationError('Not authenticated');
    }
  },

  Mutation: {
    addQuiz: async (parent, args, context) => {
      if (context.user) {
        const quiz = await Quiz.create(args);
        return quiz;
      }
      throw new AuthenticationError('Not authenticated');
    },
    scoreQuiz: async (parent, { _id, count, percentCorrect }, context) => {
      if (context.user) {
        const updateData = { count, percentCorrect };

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
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        if (err.code === 11000) {
          throw new UserInputError('An account with this email already exists.');
        }
        throw new Error('An error occurred. Please try again.');
      }
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
    },
    requestPasswordReset: async (_, { email }, context) => {
      const userPs = await UserPs.findOne({ email });
      if (!userPs) {
        throw new UserInputError('User not found', {
          extensions: { code: 'USER_NOT_FOUND' },
        });
      }

      const resetToken = userPs.createPasswordResetToken();
      console.log(resetToken);
      await userPs.save();

      const resetURL = `http://localhost:3000/resetPassword/${resetToken}`;
      try {
        await sendEmail({
          to: user.email,
          subject: 'Password Reset',
          text: `Reset your password by visiting the following link: ${resetURL}`,
        });

        // Assuming email sending was successful
        return { message: 'Password reset email sent' };
      } catch (error) {
        // Handle email sending failure
        console.error(error);
        throw new ApolloError('Failed to send email', 'EMAIL_SEND_FAILED');
      }
    },

    resetPassword: async (_, { token, newPassword }) => {
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
      const userPs = await UserPs.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!userPs) {
        throw new UserInputError('Token is invalid or has expired', {
          extensions: { code: 'TOKEN_INVALID_OR_EXPIRED' },
        });
      }

      user.password = newPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await userPs.save();

      return { message: 'Password has been reset' };
    },
    addQuizComment: async (parent, { _id, userId, commentText }, context) => {
      if (context.user) {
        const quiz = await Quiz.findById(_id);
        if (!quiz) {
          throw new UserInputError('Quiz not found');
        }
        const comment = {
          user: userId,
          commentText,
          createdAt: new Date()
        };
        quiz.comments.push(comment);
        await quiz.save();
        return quiz;
      }
      throw new AuthenticationError('Not authenticated');
    },
    recordLogin: async (parent, { userId }, context) => {
      if (context.user) {
        const user = await User.findById(userId);
        if (!user) {
          throw new UserInputError('User not found');
        }
        const login = {
          date: new Date()
        };
        user.dailyLogins.push(login);
        await user.save();
        return user;
      }
      throw new AuthenticationError('Not authenticated');
    }
  }
};

module.exports = resolvers;
