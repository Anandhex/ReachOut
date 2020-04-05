const express = require('express');

const postRoutes = require('./postRoutes');

const {
  getUsers,
  saveUser,
  getUser,
  updateUser,
  deleteUser,
  addFriend,
  getFriends,
  deleteFriend,
  uploadProfileImg
} = require('../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect
} = require('../controllers/authController');

const router = express.Router();

router.use('/:userId/posts', postRoutes);

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router
  .route('/')
  .get(getUsers)
  .post(saveUser);

router.route('/friends').get(protect, getFriends);
router.route('/profileUpload').post(protect, uploadProfileImg);
router
  .route('/friends/:userId')
  .patch(protect, addFriend)
  .delete(protect, deleteFriend);

router
  .route('/:id')
  .get(getUser)
  .patch(protect, updateUser);
// .delete(deleteUser);

module.exports = router;
