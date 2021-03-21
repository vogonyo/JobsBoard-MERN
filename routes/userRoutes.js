const express = require('express');
const router = express.Router()
const { protect, admin } = require('../middleware/authMiddleware.js');

const {
    loginUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
  } = require('../controllers/userController.js');

router
  .route('/')
  .post(registerUser)
  .get(protect, admin, getUsers)
router
    .post('/login', loginUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

module.exports = router;