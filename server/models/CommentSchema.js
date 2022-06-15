const mongoose = require('mongoose');
const Post = require('./PostSchema');

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
      maxlength: [500, 'Comment must be less than 500 characters'],
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

CommentSchema.pre('save', async function (next) {
  await Post.findByIdAndUpdate(this.post, { $push: { comments: this._id } });
  next();
});

CommentSchema.pre('remove', { document: true }, async function (next) {
  await Post.findByIdAndUpdate(this.post, { $pull: { comments: this._id } });
  next();
});

module.exports = mongoose.model('Comment', CommentSchema);
