const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/users-controller.js');

// /api/users
router.route('/').
get(getUsers).
post(createUser);

// /api/courses/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

  router.route('/userID/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend)

module.exports = router;
