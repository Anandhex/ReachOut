const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  //array of objects
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
});
