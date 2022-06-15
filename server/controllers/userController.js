const { isValidObjectId } = require('mongoose');
const User = require('../models/UserSchema');
const Post = require('../models/PostSchema');
const {
  verifyAuthor,
  idExistsInArray,
  encryptedID,
} = require('../services/validateService');

const updateUser = async (req, res) => {
  const { password, followers, following, posts, ...update } = req.body;

  if (!verifyAuthor(req.currentUser, req.params.id)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getUsers = async (req, res) => {
  try {
    // const users = await User.find().populate('followers following', 'name');

    const users = await User.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          followersCount: { $size: '$followers' },
          followingCount: { $size: '$following' },
          postsCount: { $size: '$posts' },
        },
      },
    ]);

    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getUserById = async (req, res) => {
  let { id } = req.params;

  // because storing the logged in users id as encrypted id in frontend
  if (encryptedID(req.currentUser) === id) {
    id = req.currentUser;
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const user = await User.findById(id).select('followers');

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const canAccessPrivate =
    user._id.toString() === req.currentUser ||
    idExistsInArray(req.currentUser, user.followers);

  const filter = canAccessPrivate ? null : { privacy: 'public' };

  try {
    const userProfile = await User.findById(id)
      .populate('posts', null, filter)
      .populate('followers', 'name')
      .populate('following', 'name');

    return res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser).select('-posts -__v');
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!verifyAuthor(req.currentUser, id)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await User.findById(id).select('posts');

    if (user.posts.length) {
      await Post.deleteMany({ _id: { $in: user.posts } });
    }

    await user.remove();
    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    return res.status(400).json({ error, success: false });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getCurrentUser,
};
