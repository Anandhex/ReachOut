const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: [true, 'Please provide a name'],
    unique: true
  },
  dob: String,
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide with a mail']
  },
  profile_img: String, //url of the image   |||Should think how we have store the image|||
  password: {
    type: String,
    required: [true, 'Please provide with a password'],
    minlength: 8,
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "Password don't match"
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  areaOfInterest: [], //array of String
  posts: [
    //array of objects
    {
      _id: String,
      postTitle: String,
      postContent: String,
      likes: Number,
      dislikes: Number,
      date: { type: Date, default: Date.now },
      comments: [
        //array of comments
        {
          _id: String,
          commentText: String,
          username: String,
          likes: Number, //should be likes and dislikes included
          dislikes: Number,
          date: { type: Date, default: Date.now },
          replies: [
            //Array of Objects
            {
              _id: String,
              replyText: String,
              username: String,
              likes: Number, //same as before comments
              dislikes: Number,
              date: { type: Date, default: Date.now }
            }
          ]
        }
      ]
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

UserSchema.methods.correctPassword = async function(passwordToMatch, password) {
  return await bcrypt.compare(passwordToMatch, password);
};

UserSchema.methods.changedPasswordAfter = function(JWTTimeStamp) {
  if (!this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }

  return false;
};

UserSchema.methods.createPassswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
