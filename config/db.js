const mongoose = require('mongoose');

require('dotenv').config({path: './config.env'});

const connectDB = async() => {
  try{
const conn = await mongoose.connect('mongodb+srv://vogonyo:nyarongi101@cluster0.wsbhf.mongodb.net/JobsBoard?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
}
catch(error){
    console.error(`Error: ${error.message} is ${process.env.MONGO_URI}`.red.underline.bold)
    process.exit(1)
}
};

module.exports = connectDB;