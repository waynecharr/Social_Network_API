const { User, Thought} = require('../models'); 


const userController = {
  // Gets all users
  async getUsers(req, res) {
    try {
      const userData = await User.find().select('-__v');
      console.log(userData);
      res.json(userData);
    } catch (error) {
      console.error('Error in getting Users.', error);
      res.status(500).json(error);
    }
  },
  async getSingleUser(req, res) {
    // Gets a single user by their id
    try {
      const userData = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        if (!userData) {
          res.status(404).json({ message: 'There is no user with that ID.' });
        } else {
          res.json(userData);
        }
      } catch (error) {
        res.status(500).json(error);
      }
  },
  // Creates a user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      console.log('User Created:', userData);
      res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Updates existing user
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      if (!userData) {
        res.status(404).json({ message: 'There is no user with that ID.' });
      } else {
        res.json(userData);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Deletes an existing user
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({_id: req.params.userId });
      if (!userData) {
        res.status(404).json({ message: 'There is no user with that ID.' });
      } else {
        res.json(userData);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Adds a friend
  async addFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      )
      if (!userData) {
        res.status(404).json({ message: 'There is no user with that ID.' });
      } else {
        res.json(userData);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Deletes a friend
  async removeFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
      if (!userData) {
        res.status(404).json({ message: 'There is no user with that ID.' });
      } else {
        res.json(userData);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

};;

module.exports = userController;


// module.exports = {
//     // Get all users
//     async getUsers(req, res) {
//       try {
//         const users = await User.find();
//         res.json(users);
//       } catch (err) {
//         console.error("Error in getting Users.",err);
//         res.status(500).json(err);
//       }
//     },
//     // Get a user
//     async getSingleUser(req, res) {
//       try {
//         const user = await User.findOne({ _id: req.params.userId })
//           .select('-__v');
  
//         if (!user) {
//           return res.status(404).json({ message: 'No user with that ID' });
//         }
  
//         res.json(user);
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     },
//     // Create a user
//     async createUser(req, res) {
//       try {
//         const user = await User.create(req.body);
//         res.json(user);
//       } catch (err) {
//         console.log(err);
//         return res.status(500).json(err);
//       }
//     },
//     // Delete a user
//     async deleteUser(req, res) {
//       try {
//         const user = await User.findOneAndDelete({ _id: req.params.userId });
  
//         if (!user) {
//           return res.status(404).json({ message: 'No user with that ID' });
//         }
//         res.json({ message: 'User deleted!' });
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     },
//     // Update a user
//     async updateUser(req, res) {
//       try {
//         const user = await User.findOneAndUpdate(
//           { _id: req.params.userId },
//           { $set: req.body },
//           { runValidators: true, new: true }
//         );
  
      //   if (!user) {
      //     return res.status(404).json({ message: 'No user with this id!' });
      //   }
  
      //   res.json(user);
      // } catch (err) {
      //   res.status(500).json(err);
      // }
//     },
//     // Add a friend to a user's friend list
//   async addFriend(req, res) {
//     try {
//       const user = await User.findById(req.params.userId);
//       const friendId = req.params.friendId;

//       if (!user) {
//         return res.status(404).json({ message: 'No user with that ID' });
//       }

//       if (user.friends.includes(friendId)) {
//         return res.status(400).json({ message: 'Friend already exists'});
//       }

//       user.friends.push(friendId);
//       await user.save();

//       res.json({ message: 'Friend added successfully', user });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   // Remove a friend from a user's friend list
//   async removeFriend(req, res) {
//     try {
//       const user = await User.findById(req.params.userId);
//       const friendId = req.params.friendId;

//       if (!user) {
//         return res.status(404).json({ message: 'No user with that ID' });
//       }

//       if (!user.friends.includes(friendId)) {
//         return res.status(400).json({ message: 'Friend is not found.' });
//       }

//       user.friends = user.friends.filter(id => id.toString() !== friendId);
//       await user.save();

//       res.json({ message: 'Friend removed successfully', user });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
//   };
  