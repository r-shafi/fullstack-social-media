const { isValidObjectId } = require('mongoose');
const Comment = require('../models/CommentSchema');
const Post = require('../models/PostSchema');
const { verifyAuthor } = require('../services/validateService');

const newComment = async (req, res) => {
  const author = req.currentUser;
  const { comment } = req.body;

  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: 'Invalid post id',
      success: false,
    });
  }

  // todo: implement verification so that only followers can comment

  const post = await Post.findById(req.params.id).select('_id');

  if (!post) {
    return res
      .status(400)
      .json({ message: 'Post does not exist', success: false });
  }

  try {
    await Comment.create({
      comment,
      author,
      post: req.params.id,
    });
    return res.status(200).json({ message: 'Comment created', success: true });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

const deleteComment = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: 'Invalid comment id',
      success: false,
    });
  }

  const comment = await Comment.findById(req.params.id).select();

  if (!comment) {
    return res.status(400).json({
      message: 'Comment does not exist',
      success: false,
    });
  }

  if (!verifyAuthor(req.currentUser, comment.author)) {
    return res.status(403).json({
      message: 'You are not authorized to delete this comment',
      success: false,
    });
  }

  try {
    await comment.remove();
    return res.status(200).json({ message: 'Comment deleted', success: true });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

module.exports = { newComment, deleteComment };
