const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const errorHandler = require('./middleware/error');
const xss = require('xss-clean');
const hpp = require('hpp');
const colors = require('colors');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const jobRouter = require('./routes/jobRoutes');
const dotenv = require('dotenv');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers


app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(hpp({
  whitelist: ['price']
}));



app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers)
  next();
});

// handle CORS related issues
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// 3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobRouter);

app.use(errorHandler);

//
app.all('*', (req, res, next) => {
  // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  })
});

// app.use(globalErrorHandler);


module.exports = app;