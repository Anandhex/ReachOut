const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  //array of objects
  userId: {
    type: String,
    required: true
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
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
