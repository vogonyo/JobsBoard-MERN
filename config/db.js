const mongoose = require('mongoose');
const colors = require('colors');
require('dotenv').config({path: './config.env'});

const connectDB = async() => {
  try{
const conn = await mongoose.connect('mongodb://127.0.0.1:27017/jobs-board-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
}
catch(error){
    console.error(`Error: ${error.message} is ${process.env.MONGO_URI}`.red.underline.bold)
    process.exit(1)
}
};

module.exports = connectDB;