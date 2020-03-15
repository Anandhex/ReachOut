const express = require('express');
const { protect } = require('../controllers/authController');
const {
  getPosts,
  addPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getPosts)
  .post(protect, addPost);
router
  .route('/:postId')
  .patch(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
