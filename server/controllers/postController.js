const { isValidObjectId } = require('mongoose');
const Post = require('../models/PostSchema');
const User = require('../models/UserSchema');
const { verifyAuthor } = require('../services/validateService');

const createPost = async (req, res) => {
  const { author, comments, likes, ...body } = req.body; // sanitize

  try {
    const post = new Post(body);
    post.author = req.currentUser;
    const submitted = await post.save();
    return res.json(submitted);
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid ID', success: false });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found', success: false });
  }

  const match = verifyAuthor(req.currentUser, post.author);

  if (!match) {
    return res
      .status(403)
      .json({ error: 'You are not authorized to delete this post' });
  }

  try {
    await post.remove();
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid ID', success: false });
  }

  const { author, comments, likes, ...body } = req.body;

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found', success: false });
  }

  const match = verifyAuthor(req.currentUser, post.author);

  if (!match) {
    return res
      .status(403)
      .json({ error: 'You are not authorized to edit this post' });
  }

  try {
    await Post.findByIdAndUpdate(id, body);
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

const getAllPosts = async (req, res) => {
  const currentUsersFollowings = await User.findById(req.currentUser).select(
    'following'
  );

  // todo: Paginate

  try {
    const Posts = await Post.find({
      $or: [
        { privacy: 'public' },
        { author: { $in: currentUsersFollowings.following } },
      ],
    })
      .select('-__v')
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    return res.status(200).json(Posts);
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

const getFeed = async (req, res) => {
  const followings = await User.findById(req.currentUser).select('following');

  if (!followings.following.length) {
    return res.status(200).json([]);
  }

  try {
    const posts = await Post.find({ author: { $in: followings.following } })
      .select('-__v')
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

const getAllPostsByUser = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid ID', success: false });
  }

  const user = await User.findById(id).select('followers');

  if (!user) {
    return res.status(404).json({ error: 'User not found', success: false });
  }

  const canAccessPrivate =
    user._id.toString() === req.currentUser ||
    user.followers.some((follower) => follower.toString() === req.currentUser);

  const filter = canAccessPrivate
    ? { author: id }
    : { author: id, privacy: 'public' };

  try {
    const posts = await Post.find(filter);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid Post ID', success: false });
  }

  const authorFollowers = await User.find({ posts: { $in: id } }).select(
    'followers'
  );

  if (!authorFollowers.length) {
    return res.status(404).json({ error: 'Post not found', success: false });
  }

  try {
    const canAccessPrivate =
      authorFollowers[0]._id.toString() === req.currentUser ||
      authorFollowers[0].followers.some(
        (follower) => follower.toString() === req.currentUser
      );

    const filter = canAccessPrivate
      ? { _id: id }
      : { _id: id, privacy: 'public' };

    const post = await Post.findOne(filter)
      .populate('author', 'name')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'name',
        },
        select: '-__v -post',
      })
      .populate('likes', 'name')
      .exec();

    if (!post) {
      throw 'You are not authorized to view this post';
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

module.exports = {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getAllPostsByUser,
  getPostById,
  getFeed,
};
