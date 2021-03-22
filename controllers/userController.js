const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken.js');
const User = require('../models/userModel.js');


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
<<<<<<< HEAD
exports.loginUser = asyncHandler(async (req, res) => {
=======
const loginUser = asyncHandler(async (req, res) => {
>>>>>>> 5987eb9b465b0b1442c1c4034a6836c9fcbfd3e0
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.verifyPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
<<<<<<< HEAD
});
=======
})

>>>>>>> 5987eb9b465b0b1442c1c4034a6836c9fcbfd3e0

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
<<<<<<< HEAD
exports.registerUser = asyncHandler(async(req, res) => {
  const{ username, email, password} = req.body;
  
  //Check if user exists
  const userExists = await User.findOne({ email });

  if(userExists){
    res.status(400);
    throw new Error('User already exists')
  }

  const user = await User.create({
    username,
    email,
    password
  })

  if(user){
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })  
  }else{
    res.status(400)
    throw new Error('Invalid user Data')
  }
});
  // @desc    Get user profile
  // @route   GET /api/users/profile
  // @access  Private
  exports.getUserProfile = asyncHandler(async (req, res) => {
=======
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password} = req.body
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    const user = await User.create({
      username,
      email,
      password
    })
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
  // @desc    Get user profile
  // @route   GET /api/users/profile
  // @access  Private
  const getUserProfile = asyncHandler(async (req, res) => {
>>>>>>> 5987eb9b465b0b1442c1c4034a6836c9fcbfd3e0
    const user = await User.findById(req.user._id)
  
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  
  // @desc    Update user profile
  // @route   PUT /api/users/profile
  // @access  Private
<<<<<<< HEAD
  exports.updateUserProfile = asyncHandler(async (req, res) => {
=======
  const updateUserProfile = asyncHandler(async (req, res) => {
>>>>>>> 5987eb9b465b0b1442c1c4034a6836c9fcbfd3e0
    const user = await User.findById(req.user._id)
  
    if (user) {
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  
  // @desc    Get all users
  // @route   GET /api/users
  // @access  Private/Admin
<<<<<<< HEAD
  exports.getUsers = asyncHandler(async (req, res) => {
=======
  const getUsers = asyncHandler(async (req, res) => {
>>>>>>> 5987eb9b465b0b1442c1c4034a6836c9fcbfd3e0
    const users = await User.find({})
    res.json(users)
  })
  
  // @desc    Delete user
  // @route   DELETE /api/users/:id
  // @access  Private/Admin
<<<<<<< HEAD
  exports.deleteUser = asyncHandler(async (req, res) => {
=======
  const deleteUser = asyncHandler(async (req, res) => {
>>>>>>> 5987eb9b465b0b1442c1c4034a6836c9fcbfd3e0
    const user = await User.findById(req.params.id)
  
    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  
  // @desc    Get user by ID
  // @route   GET /api/users/:id
  // @access  Private/Admin
<<<<<<< HEAD
  exports.getUserById = asyncHandler(async (req, res) => {
=======
  const getUserById = asyncHandler(async (req, res) => {
>>>>>>> 5987eb9b465b0b1442c1c4034a6836c9fcbfd3e0
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  
  // @desc    Update user
  // @route   PUT /api/users/:id
  // @access  Private/Admin
<<<<<<< HEAD
  exports.updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      user.username = req.body.username || user.username
=======
  const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      user.name = req.body.username || user.username
>>>>>>> 5987eb9b465b0b1442c1c4034a6836c9fcbfd3e0
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
<<<<<<< HEAD
  });
=======
  })
  
  module.exports = {
    loginUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
  };
>>>>>>> 5987eb9b465b0b1442c1c4034a6836c9fcbfd3e0
