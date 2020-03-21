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
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment'
    }
  ],
  createDate: { type: Date, default: Date.now },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// postSchema.virtual('comments', {
//   ref: 'Comment',
//   foreignField: 'postId',
//   localField: '_id'
// })

postSchema.pre(/^find/, function (next) {
  // this.populate({ path: 'userId', select: 'name' })
  next()
})


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
