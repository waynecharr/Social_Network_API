const { Schema, model } = require('mongoose');
const Reaction = require('./reactions');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => {
      return new Date(timestamp).toLocaleDateString();
    },
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [Reaction.schema], // Correctly reference the reactionSchema
});

// Virtual called "reactioncount" that retrieves the length of the thoughts "reactions" array field
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;