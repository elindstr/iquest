const { User, Quiz } = require('../models');

const cleanDB = async (modelName, collectionName) => {
  if (modelName === 'User') {
    await User.deleteMany({});
  } else if (modelName === 'Quiz') {
    await Quiz.deleteMany({});
  }
};

module.exports = cleanDB;
