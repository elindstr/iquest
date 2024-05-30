const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  profilePictureURL: {
    type: String,
  },
  profileBio: {
    type: String,
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  passwordResetToken: String,
  passwordResetExpires: Date,
  iq: {
    type: Number,
    default: 120,
  },
  dailyLogins: [{
    date: {
      type: Date,
      default: Date.now
    }
  }]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// generate password reset token
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token expires after 10 minutes

  return resetToken;
  console.log(resetToken);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
