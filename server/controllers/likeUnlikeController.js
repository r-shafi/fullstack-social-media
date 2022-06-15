const { isValidObjectId } = require('mongoose');
const Post = require('../models/PostSchema');
const { idExistsInArray } = require('../services/validateService');

const toggleLike = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).send({ message: 'Invalid post id', success: false });
  }

  const post = await Post.findById(req.params.id).select('likes');

  if (!post) {
    return res.status(400).send({ message: 'Post not found', success: false });
  }

  try {
    const liked = idExistsInArray(req.currentUser, post.likes);

    if (liked) {
      await post.likes.pull(req.currentUser);
      await post.save();
      return res.status(200).json({ message: 'unliked', success: true });
    }
    await post.likes.push(req.currentUser);
    await post.save();
    return res.status(200).json({ message: 'liked', success: true });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { toggleLike };
