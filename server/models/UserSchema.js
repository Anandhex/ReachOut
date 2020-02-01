var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: String,
  username: String,
  dob: String,
  email: String,
  profile_img: String, //url of the image   |||Should think how we have store the image|||
  password: String,
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
  ]
});

exports.User = mongoose.model("User", userSchema);
