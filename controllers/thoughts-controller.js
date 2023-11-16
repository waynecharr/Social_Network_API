const { Thought } = require('../models/'); 


module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
      try {
        const thoughts = await User.find();
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Get a thought
    async getSingleThought(req, res) {
      try {
        const thought = await thought.findOne({ _id: req.params.thoughtId })
          .select('-__v');
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Create a thought
    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
        res.json(thought);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Delete a thought
    async deleteThought(req, res) {
      try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json({ message: 'thought deleted!' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Update a thought
    async updateThought(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
     // Create a reaction for a thought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      const newReaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      };

      thought.reactions.push(newReaction);
      await thought.save();

      res.json({ message: 'Reaction created successfully', thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a reaction from a thought
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      const reactionIdToRemove = req.params.reactionId;
      thought.reactions = thought.reactions.filter(reaction => reaction.reactionId.toString() !== reactionIdToRemove);
      await thought.save();

      res.json({ message: 'Reaction removed successfully', thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  };
  