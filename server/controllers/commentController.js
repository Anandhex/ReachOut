const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const AppError = require('../utils/appError');
const APIfeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getComments = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(
    Comment.find({ userId: req.userId }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const comments = await features.query;
  res.status(200).json({ status: 'success', data: { comments } });
});

exports.addComment = catchAsync(async (req, res, next) => {
  req.body.userId = req.user._id;
  req.body.username = req.user.email;
  req.body.postId = req.params.postId;
  const comment = await Comment.create(req.body);
  let post = await Post.findById(req.body.postId);
  post.comments = [...post.comments, comment._id];
  post = await Post.findByIdAndUpdate(post._id, post, { new: true }).populate(
    'comments'
  );
  res.status(201).json({ status: 'success', data: { data: post } });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  let comment = await Comment.findOne({ _id: req.params.commentId });
  if (comment) {
    if (req.user._id.equals(comment.userId)) {
      comment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        req.body,
        {
          new: true
        }
      );
      let post = await Post.findById(comment.postId).populate('comments');
      res.status(200).json({ status: 'success', data: { data: post } });
    } else {
      next(new AppError('Unauthorized. Please login to update the post', 403));
    }
  } else {
    next(new AppError('Comment not found', 404));
  }
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  let comment = await Comment.findOne({ _id: req.params.commentId });
  if (comment) {
    if (req.user._id.equals(comment.userId)) {
      comment = await Comment.findByIdAndDelete(req.params.commentId);
      if (!comment) {
        return next(new AppError('No post found with that ID', 404));
      }
      let post = await Post.findById(comment.postId);
      post.comments = post.comments.filter(
        comment => comment !== req.params.commentId
      );
      post = await Post.findByIdAndUpdate(post._id, post, {
        new: true
      }).populate('comments');
      res.status(201).json({ status: 'success', data: { data: post } });
    } else {
      next(new AppError('Unauthorized. Please login to update the post', 403));
    }
  } else {
    next(new AppError('Comment not found', 404));
  }
});
