const { User } = require('../models'); 


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
  // Removes a friend
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


