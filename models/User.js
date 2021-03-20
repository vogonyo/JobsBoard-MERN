const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true, "username can't be blank"],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required:[true, "username can't be blank"],
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide valid email']
    },
    role: {
        type: String,
        enum: ['user', 'moderator', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
      // This only works on CREATE and SAVE!!!
            validator: function(el) {
                 return el === this.password;
         },
        message: 'Passwords are not the same!'
     }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    createdAt: {
         type: Date,
        default: Date.now,
    },
    active:{
         type: Boolean,
         default: true,
         select: false
    }
    
});


const User = mongoose.mode('User', userSchema);

module.exports = User;