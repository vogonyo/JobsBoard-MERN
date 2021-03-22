const mongoose = require('mongoose');

require('dotenv').config({path: './config.env'});

const connectDB = async() => {
  try{
const conn = await mongoose.connect(process.env.MONGO_URI, {
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