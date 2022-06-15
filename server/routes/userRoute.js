const express = require('express');
const {
  getUsers,
  getUserById,
  updateUser,
  // followUser,
  deleteUser,
  getCurrentUser,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
// position matters, having /me before /:id will match /me first
// otherwise it will match /:id first and 'me' will always be processed as id
// and it'd never work
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;
