const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config({path: '/config/config.env'});

app.get('/api/jobs', )
const PORT = process.env.PORT || 2000;

app.listen(
    PORT,
    console.log(`Listening to port ${PORT}, server running in ${process.env.NODE_ENV}`)
);