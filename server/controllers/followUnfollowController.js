const User = require('../models/UserSchema');
const { idExistsInArray } = require('../services/validateService');

const toggleFollow = async (req, res) => {
  const { id } = req.params;
  const { currentUser } = req;

  if (id === currentUser) {
    return res
      .status(400)
      .json({ message: 'You cannot follow yourself', success: false });
  }

  try {
    const user = await User.findById(id).select('followers');

    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', success: false });
    }

    const following = idExistsInArray(currentUser, user.followers);

    if (following) {
      await User.findByIdAndUpdate(currentUser, {
        $pull: { following: id },
      });
      await User.findByIdAndUpdate(id, {
        $pull: { followers: currentUser },
      });
      return res.status(200).json({ message: 'Unfollowed', success: true });
    }
    await User.findByIdAndUpdate(currentUser, {
      $addToSet: { following: id },
    });
    await User.findByIdAndUpdate(id, {
      $addToSet: { followers: currentUser },
    });
    return res.status(200).json({ message: 'Followed', success: true });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { toggleFollow };
