const bcrypt = require('bcrypt');
const User = require('../models/UserSchema');
const { generateToken } = require('../services/jwtService');
const { encryptedID } = require('../services/validateService');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email }).select('password');

    if (!user.length) {
      return res
        .status(400)
        .json({ message: 'User not found', success: false });
    }

    const match = await bcrypt.compare(password, user[0].password);

    if (!match) {
      return res
        .status(400)
        .json({ message: 'Wrong password', success: false });
    }

    const token = generateToken({ id: user[0]._id }, { expiresIn: '1800s' });

    return res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      })
      .json({ success: true, id: encryptedID(user[0]._id) });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { login };
