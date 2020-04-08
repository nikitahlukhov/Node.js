const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create user Schema and model
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Name field is required'],
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
  },
  role: {
    type: String,
    required: [true, 'Type field is required'],
  },
  status: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
