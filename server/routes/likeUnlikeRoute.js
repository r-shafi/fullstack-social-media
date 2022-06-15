const express = require('express');

const router = express.Router();

const { toggleLike } = require('../controllers/likeUnlikeController');

router.put('/:id', toggleLike); // post id

module.exports = router;
