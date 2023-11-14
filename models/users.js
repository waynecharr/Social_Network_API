const { Schema, model } = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  });
  
  // Virtual called "friendcountt" that retrieves the length of the user's "friends" array field on query
  userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  

  const User = mongoose.model('User', userSchema);
  
  module.exports = User;