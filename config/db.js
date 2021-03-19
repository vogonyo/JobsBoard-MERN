const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: '/config/config.env'});

const connectDB = async() => {
const conn = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
   
};

module.exports = connectDB;