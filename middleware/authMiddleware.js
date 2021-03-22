const jwt = require('jsonwebtoken');
const asyncHandler =require('express-async-handler');
const User = require('../models/userModel.js');

<<<<<<< HEAD


exports.protect = asyncHandler(async (req, res, next) => {
=======
const protect = asyncHandler(async (req, res, next) => {
>>>>>>> 5987eb9b465b0b1442c1c4034a6836c9fcbfd3e0
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1]
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
        req.user = await User.findById(decoded.id).select('-password')
  
        next()
      } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
      }
    }
  
    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  });

  
<<<<<<< HEAD
exports.admin = (req, res, next) => {
=======
const admin = (req, res, next) => {
>>>>>>> 5987eb9b465b0b1442c1c4034a6836c9fcbfd3e0
    if (req.user && req.user.isAdmin) {
      next()
    } else {
      res.status(401)
      throw new Error('Not authorized as an admin')
    }
<<<<<<< HEAD
};
=======
  };


module.exports = {
    protect, admin
}

>>>>>>> 5987eb9b465b0b1442c1c4034a6836c9fcbfd3e0
