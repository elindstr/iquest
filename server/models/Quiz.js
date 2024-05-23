// server/models/Quiz.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  commentText: {
    type: String,
    required: true
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
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  percentCorrect: {
    type: Number,
    required: true
  },
  comments: [commentSchema]
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
