const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('../data/users');
const User = require('../models/userModel');
const connectDB = require('../config/db');
const colors = require('colors');

dotenv.config()
connectDB();

const importData = async () => {
    try{
       await User.deleteMany();
       const createdUsers = await User.insertMany(users)
       const adminUser = createdUsers[0]._id;
       console.log('Data Imported!'.green.inverse)
       process.exit();
    }
    catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1)
    }
}

const deleteData = async () => {
    try{
       await User.deleteMany();
       console.log('Data Destroyed!'.red.inverse)
       process.exit();
    }
    catch(error){
        console.error(`${error}`);
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    deleteData();
}
else if(process.argv[2] === '-i'){
    importData();
}