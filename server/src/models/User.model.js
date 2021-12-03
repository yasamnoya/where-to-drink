const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  facebookId: {
    type: String,
  },
  googleId: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
