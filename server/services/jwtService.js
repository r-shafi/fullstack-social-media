const jwt = require('jsonwebtoken');

const generateToken = (payload, options = {}) =>
  jwt.sign(payload, process.env.TOKEN_SECRET, options);

module.exports = { generateToken };
