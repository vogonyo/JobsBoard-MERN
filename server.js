const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: '/config/config.env'});


const connectDB = require('./config/db');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Load env vars

// Connect to database
connectDB();


// const userRouter = require('./routes/userRoutes');
// const challengeRouter = require('./routes/challengeRoutes');


const app = require('./app');

const PORT = process.env.PORT || 7000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});