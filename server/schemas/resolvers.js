const bcrypt = require('bcrypt');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const { User } = require('../models'); 

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (parent, { _id }) => {
      return await User.findById(_id);
    },
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
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
