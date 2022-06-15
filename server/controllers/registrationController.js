const User = require('../models/UserSchema');

const registerUser = async (req, res) => {
  try {
    await User.create(req.body);
    return res
      .status(201)
      .json({ success: true, message: 'User Created Successfully' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { registerUser };
