const express = require('express');
const { protect } = require('../controllers/authController');
const {
  getPosts,
  addPost,
  updatePost,
  deletePost,
  getPost
} = require('../controllers/postController');

const commentRoutes = require('../routes/commentRoutes')
const router = express.Router({ mergeParams: true });

router.use('/:postId/:comments', commentRoutes)

router
  .route('/')
  .get(getPosts)
  .post(protect, addPost);
router
  .route('/:postId')
  .get(getPost)
  .patch(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
