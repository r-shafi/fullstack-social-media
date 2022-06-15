const express = require('express');

const router = express.Router();

const {
  newComment,
  deleteComment,
} = require('../controllers/commentController');

router.post('/:id', newComment); // post id
router.delete('/:id', deleteComment); // post id

module.exports = router;
