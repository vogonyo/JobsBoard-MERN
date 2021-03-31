const AppError = require("../utils/appError");

const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message

    //Log to console for development

    //Mongoose Bad Object Id
    if(err.name === 'CastError'){
        const message=`Job not found with id of ${err.value}`;
        error = new AppError(message, 404);
    }

    //Mongoose Duplicate Error
    if(err.code === 11000){
        const message = `Duplicate field entered`;
        error = new AppError(message, 400);
    }
    
    //Mongoose Validation Error
    if(err.name === 'ValidatorError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new AppError(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });

}


module.exports = errorHandler;