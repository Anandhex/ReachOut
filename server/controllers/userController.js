const User = require('../models/userModel');
const APIfeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getUsers = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;
  res.status(200).json({ status: 'success', data: { users } });
});

exports.saveUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({ status: 'success', data: { user: newUser } });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ status: 'success', data: { user } });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(201).json({ status: 'success', data: { message: 'deleted' } });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(201).json({ status: 'success', data: { user } });
});
