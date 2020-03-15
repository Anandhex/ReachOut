const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  //array of objects
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Post should belong the user']
  },
  postTitle: {
    type: String,
    required: [true, 'Please provide post title']
  },
  postContent: {
    type: String,
    required: [true, 'Please provide the content']
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  createDate: { type: Date, default: Date.now },
  comments: [
    //array of comments
    {
      _id: String,
      commentText: String,
      username: String,
      likes: Number, //should be likes and dislikes included
      dislikes: Number,
      date: { type: Date, default: Date.now }
    }
  ]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

postSchema.pre(/^find/, function (next) {
  // this.populate({ path: 'userId', select: 'name' })
  next()
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
