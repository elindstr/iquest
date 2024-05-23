const mongoose = require('mongoose');
const { Schema } = mongoose;

const quizSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  difficulty: {
    type: String
  },
  count: {
    type: Number
  },
  category: {
    type: String
  },
  percentCorrect: {
    type: Number
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
