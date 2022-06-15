const express = require('express');
const {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getAllPostsByUser,
  getPostById,
  getFeed,
} = require('../controllers/postController');

const router = express.Router();

router.post('/', createPost);
router.delete('/:id', deletePost);
router.put('/:id', editPost);

router.get('/feed', getFeed);
router.get('/public', getAllPosts);
router.get('/all/:id', getAllPostsByUser);
router.get('/:id', getPostById);

module.exports = router;
