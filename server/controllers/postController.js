const Post = require('../models/postModel');
const AppError = require('../utils/appError');
const APIfeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getPosts = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Post.find({ userId: req.userId }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const posts = await features.query;
  res.status(200).json({ status: 'success', data: { posts } });
});

exports.addPost = catchAsync(async (req, res, next) => {
  req.body.userId = req.user._id;
  const post = await Post.create(req.body);
  res.status(201).json({ status: 'success', data: { post } });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  let post = await Post.findOne({ _id: req.params.postId });
  console.log(req.user._id, post.userId);
  if (req.user._id.equals(post.userId)) {
    post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
      new: true
    });
    res.status(200).json({ status: 'success', data: { post } });
  } else {
    next(new AppError('Unauthorized. Please login to update the post', 403));
  }
});

exports.deletePost = catchAsync(async (req, res, next) => {
  let post = await Post.findOne({ _id: req.params.postId });
  if (req.user._id.equals(post.userId)) {
    post = await Post.findByIdAndDelete(req.params.postId);
    if (!post) {
      return next(new AppError('No post found with that ID', 404));
    }
    res.status(201).json({ status: 'siccess', message: 'deleted' });
  } else {
    next(new AppError('Unauthorized. Please login to update the post', 403));
  }
});
