const Comment = require('../models/commentModel');
const AppError = require('../utils/appError');
const APIfeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getComments = catchAsync(async (req, res, next) => {
    const features = new APIfeatures(Comment.find({ userId: req.userId }), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const comments = await features.query;
    res.status(200).json({ status: 'success', data: { comments } });
});

exports.addComment = catchAsync(async (req, res, next) => {
    req.body.userId = req.user._id;
    const comment = await Comment.create(req.body);
    res.status(201).json({ status: 'success', data: { comment } });
});

exports.updateComment = catchAsync(async (req, res, next) => {
    let comment = await Comment.findOne({ _id: req.params.commentId });
    if (req.user._id.equals(comment.userId)) {
        comment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, {
            new: true
        });
        res.status(200).json({ status: 'success', data: { comment } });
    } else {
        next(new AppError('Unauthorized. Please login to update the post', 403));
    }
});

exports.deletePost = catchAsync(async (req, res, next) => {
    let comment = await Comment.findOne({ _id: req.params.commentId });
    if (req.user._id.equals(comment.userId)) {
        comment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!comment) {
            return next(new AppError('No post found with that ID', 404));
        }
        res.status(201).json({ status: 'success', message: 'deleted' });
    } else {
        next(new AppError('Unauthorized. Please login to update the post', 403));
    }
});
