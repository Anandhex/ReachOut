const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.staus(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.email,
    passwordConfirm: req.body.passwordConfirm
  });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.header.authorization &&
    req.header.authorization.startsWith('Bearer')
  ) {
    token = req.header.authorization.split(' ')[1];
  }
  //   console.log(token);

  if (!token) {
    return next(
      new AppError('You are not logged in. Please log in to access  ', 401)
    );
  }

  const decoded = await promisify(jwt.verify(token, process.env.JWT_SECRET));

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError('The user belogning to the token no longer exists', 401)
    );
  }

  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'User recently changed the password! Please log in again',
        401
      )
    );
  }
  req.user = user;
  next();
});

// exports.restrictTo = (...roles) =>{
//     return (req,res,next)=>{
//         if(!roles.includes(req.user.))
//     }
// }

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.find({ email: req.body.email });
  if (!user) {
    return next(new AppError('No user with that email address', 404));
  }
  const resetToken = user.createPassswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your Password? Submit your new password and confirm your password at ${resetURL}.\n If you didn't forgot your password, please ignore this email.`;

  //   await
});

exports.resetPassword = (req, res, next) => {};
