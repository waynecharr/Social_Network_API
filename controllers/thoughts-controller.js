const { Thoughts, User } = require('../models/'); 


const thoughtsController = {
  //Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thoughts.find().select('-__v');
      res.json(thoughtData);
    } catch (error) {
      console.error('Error in getting Thoughts.', error);
      res.status(500).json(error);
    }
  },
  // Gets a single thought by the id
  async getSingleThought(req, res) {
    try {
      const thoughtData = await Thoughts.findOne({_id: req.params.thoughtId}).select('-__v');
      if (!thoughtData) {
        res.status(404).json({ message: 'There is no thought with that ID.' });
      } else {
        res.json(thoughtData);
      }
    } catch (error) {
      console.error('Error in getting Single Thought:', error);
      res.status(500).json(error);
    }
  },
  // Creates a single thought and attaches it a user
  async createThought(req, res) {
    try {
      const thoughtData = await Thoughts.create(req.body);
      const userData = await User.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );
      res.json(thoughtData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Updates a single thought 
  async updateThought(req, res) {
    try {
      const thoughtData = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thoughtData) {
        res.status(404).json({ message: 'There is no thought with that ID.' });
      } else {
        res.json(thoughtData);
      }
    } catch (error) {
      console.error('Error updating thought:', error);
      res.status(500).json(error);
    }
  },
  // Deletes a single thought
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });
      if (!thoughtData) {
        res.status(404).json({ message: 'There is no thought with that ID.' });
      } else {
        res.json(thoughtData);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};;

module.exports = thoughtsController;

// module.exports = {
//     // Get all thoughts
//     async getThoughts(req, res) {
//       try {
//         const thoughts = await User.find();
//         res.json(thoughts);
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     },
//     // Get a thought
//     async getSingleThought(req, res) {
//       try {
//         const thought = await thought.findOne({ _id: req.params.thoughtId })
//           .select('-__v');
  
//         if (!thought) {
//           return res.status(404).json({ message: 'No thought with that ID' });
//         }
  
//         res.json(thought);
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     },
//     // Create a thought
//     async createThought(req, res) {
//       try {
//         const thought = await Thought.create(req.body);
//         res.json(thought);
//       } catch (err) {
//         console.log(err);
//         return res.status(500).json(err);
//       }
//     },
//     // Delete a thought
//     async deleteThought(req, res) {
//       try {
//         const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
  
//         if (!thought) {
//           return res.status(404).json({ message: 'No thought with that ID' });
//         }
//         res.json({ message: 'thought deleted!' });
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     },
//     // Update a thought
//     async updateThought(req, res) {
//       try {
//         const thought = await Thought.findOneAndUpdate(
//           { _id: req.params.thoughtId },
//           { $set: req.body },
//           { runValidators: true, new: true }
//         );
  
//         if (!thought) {
//           return res.status(404).json({ message: 'No thought with this id!' });
//         }
  
//         res.json(thought);
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     },
//      // Create a reaction for a thought
//   async createReaction(req, res) {
//     try {
//       const thought = await Thought.findById(req.params.thoughtId);

//       if (!thought) {
//         return res.status(404).json({ message: 'No thought with that ID' });
//       }

//       const newReaction = {
//         reactionBody: req.body.reactionBody,
//         username: req.body.username,
//       };

//       thought.reactions.push(newReaction);
//       await thought.save();

//       res.json({ message: 'Reaction created successfully', thought });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   // Remove a reaction from a thought
//   async removeReaction(req, res) {
//     try {
//       const thought = await Thought.findById(req.params.thoughtId);

//       if (!thought) {
//         return res.status(404).json({ message: 'No thought with that ID' });
//       }

//       const reactionIdToRemove = req.params.reactionId;
//       thought.reactions = thought.reactions.filter(reaction => reaction.reactionId.toString() !== reactionIdToRemove);
//       await thought.save();

//       res.json({ message: 'Reaction removed successfully', thought });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
//   };
  