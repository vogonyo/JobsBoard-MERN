const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: '/config/config.env'});

const conn = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });