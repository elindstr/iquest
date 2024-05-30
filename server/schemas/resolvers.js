const { User } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const { GraphQLError, } = require('graphql');
const { UserInputError, AuthenticationError } = require('apollo-server-errors');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail'); // Ensure this utility is implemented

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new AuthenticationError('Not authenticated');
    }
  },

  Mutation: {
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
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
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
      const user = await User.findOne({ email });
      if (!user) {
        throw new UserInputError('User not found', {
          extensions: { code: 'USER_NOT_FOUND' },
        });
      }

      const resetToken = user.createPasswordResetToken();
      console.log(resetToken);
      await user.save();

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
      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        throw new UserInputError('Token is invalid or has expired', {
          extensions: { code: 'TOKEN_INVALID_OR_EXPIRED' },
        });
      }

      user.password = newPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      return { message: 'Password has been reset' };
    },
  },
};

module.exports = resolvers;
