// server/models/Quiz.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  commentText: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const quizSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  difficulty: {
    type: String,
  },
  count: {
    type: Number,
  },
  category: {
    type: String,
  },
  percentCorrect: {
    type: Number,
  },
  comments: [commentSchema]
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
