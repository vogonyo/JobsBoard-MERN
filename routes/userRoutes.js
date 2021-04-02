const express = require('express');
const router = express.Router()
const { auth, admin } = require('../middleware/authMiddleware.js');

const {
    loginUser,
    registerUser,
    forgotPassword,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
  } = require('../controllers/userController.js');

router
  .route('/')
  .post(registerUser)
  .get(auth, admin, getUsers)

router
    .post('/login', loginUser)

router
    .post('/forgotpassword', forgotPassword)
  
router
  .route('/profile')
  .get(auth, getUserProfile)
  .put(auth, updateUserProfile)
  
router
  .route('/:id')
  .delete(auth, admin, deleteUser)
  .get(auth, admin, getUserById)
  .put(auth, admin, updateUser)

module.exports = router;