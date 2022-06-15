const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.clearCookie('token');
  res.end();
});

module.exports = router;
