const mongoose = require('mongoose');
const User = require('./UserSchema');

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, 'Post body is required'],
      trim: true,
      maxlength: [1000, 'Content must be less than 1000 characters'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    privacy: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
      lowercase: true,
    },
  },
  { timestamps: true }
);

PostSchema.pre('save', async function (next) {
  if (this.author) {
    await User.findByIdAndUpdate(this.author, {
      $addToSet: { posts: this._id },
    });
  }

  next();
});

PostSchema.pre('remove', async function (next) {
  await User.findByIdAndUpdate(this.author, {
    $pull: { posts: this._id },
  });
  next();
});

module.exports = mongoose.model('Post', PostSchema);
