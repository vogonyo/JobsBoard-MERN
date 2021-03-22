const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
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
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active:{
         type: Boolean,
         default: true,
         select: false
    },
  },
  {
     timestamps: true,
     toJSON: {
        virtuals: true,
      },
    toObject: {
      virtuals: true,
   },
});

userSchema.methods.verifyPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    const salt = bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    
    next();
});

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };
  
  userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    // console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };

const User = mongoose.model('User', userSchema);

module.exports = User;