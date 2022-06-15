const jwt = require('jsonwebtoken');
const { encryptedID } = require('../services/validateService');

const authenticateToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized', no_token: token });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .json({ message: 'Unauthorized', error, verified: false });
    }
    req.currentUser = decoded.id;

    if (req.headers.uid !== encryptedID(req.currentUser)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  });
};

module.exports = authenticateToken;
