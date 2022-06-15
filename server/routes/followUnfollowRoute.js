const express = require('express');
const { toggleFollow } = require('../controllers/followUnfollowController');

const router = express.Router();

router.put('/:id', toggleFollow);

module.exports = router;
