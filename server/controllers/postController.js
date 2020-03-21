const Post = require('../models/postModel');
const AppError = require('../utils/appError');
const APIfeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getPosts = catchAsync(async (req, res, next) => {

  const features = new APIfeatures(Post.find({ userId: req.params.userId }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const posts = await features.query.populate('comments');
  res.status(200).json({ status: 'success', data: { posts } });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId).populate('comments')
  res.status(200).json({
    status: 'success',
    data: {
      data: post
    }
  })
})


exports.addPost = catchAsync(async (req, res, next) => {
  req.body.userId = req.params.userId ? req.params.userId : req.user._id;
  if (req.user._id.equals(req.body.userId)) {
    const post = await Post.create(req.body);
    res.status(201).json({ status: 'success', data: { data: post } });
  } else {
    next(new AppError('Unauthorized access', 403))
  }
});

exports.updatePost = catchAsync(async (req, res, next) => {
  let post = await Post.findOne({ _id: req.params.postId });
  if (post) {
    if (req.user._id.equals(post.userId)) {
      post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
        new: true
      });
      res.status(200).json({ status: 'success', data: { data: post } });
    } else {
      next(new AppError('Unauthorized. Please login to update the post', 403));
    }
  } else {
    next(new AppError('Post not found', 404));
  }
});

exports.deletePost = catchAsync(async (req, res, next) => {

  if (req.user._id.equals(post.userId)) {
    post = await Post.findByIdAndDelete(req.params.postId);
    if (!post) {
      return next(new AppError('No post found with that ID', 404));
    }
    res.status(201).json({ status: 'success', message: 'deleted' });
  } else {
    next(new AppError('Unauthorized. Please login to update the post', 403));
  }
});
