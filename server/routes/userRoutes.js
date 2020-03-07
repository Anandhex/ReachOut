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
  deleteFriend
} = require('../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router
  .route('/')
  .get(getUsers)
  .post(saveUser);

router.route('/friends').get(protect, getFriends);

router
  .route('/friends/:userId')
  .patch(protect, addFriend)
  .delete(protect, deleteFriend);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

router.use(
  '/:id/posts',
  (req, res, next) => {
    req.userId = req.params.id;
    next();
  },
  postRoutes
);

module.exports = router;
