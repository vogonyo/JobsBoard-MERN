const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');
const Job = require('../models/jobModel');


exports.aliasTopJobs = (req, res, next) => {
    req.query.limits= '10';
    req.query.fields='logo,company,new,featured,position,postedAt,location,contract';
    req.query.sort='-postedAt';
    next();
}

//@desc Create new Job 
//@route POST /api/jobs
//@access Private
exports.createJob = asyncHandler(async(req, res) => {
  const newJob = await Job.create(req.body);
  
  res.status(201).json({
      status: 'success',
      data: {
          job: newJob
      }
  });
});

//@desc Get all Jobs
//@route GET /api/jobs
//@access Public
exports.getAllJobs = asyncHandler(async(req, res) => {

    //1)Remove page ,sort , limit, fields
   const queryObj = {...req.query};
   const excludedFields = ['page', 'sort', 'limit', 'fields'];
   excludedFields.forEach(el => delete queryObj[el]);
    
   //2) Replace lte or gte or gt or lt with $lte 
   let queryStr = JSON.stringify(queryObj);
   queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  
   let query = Job.find(JSON.parse(queryStr));

   //2) Sorting
   if(req.query.sort){
    //Allow for multiple sort field separated by comma => saved in sortBy 
       const sortBy = req.query.sort.split(',').join(' ')
       query = query.sort(sortBy);
    //If user does not specify the type of sorting
   }else{
       query = query.sort('-postedAt');
   }

   //Field Limiting
   if(req.query.fields){
       const fields = req.query.fields.split(',').join(' ');
       query.select(fields);
   
    }else{
    query = query.select('-__v')
   }
   
   //Pagination
   const page = req.query.page * 1 || 1;
   const limit = req.query.limit * 1 || 10;
   const skip = (page - 1) * limit;

   //page=3&limit=10, 1-10, page 1, 11-20, page 2, 21-30, page 3
   query = query.skip(skip).limit(limit);

   if(req.query.page){
       const numJobs = await Job.countDocuments();
       if(skip >= numJobs) throw new Error('This page does not exist')
   }
   
   const jobs = await query;

   res.status(200).json({
       status: 'success',
       results: jobs.length,
       data: {
           jobs
       }
   })
});


//@desc Get single Job by Slug
//@route GET /api/job/:slug
//@access Public
exports.getJob= asyncHandler(async(req, res, next) => {
    const job = await Job.findById(req.params.id);

    if(!job){
        return next(new AppError(`Job not found with id of ${req.params.id}`), 404);
    }

    res.status(200).json({
        status: 'success',
        data: {
            job
        }
    });
});

//@desc Update single Job by Id
//@route PATCH /api/job/:id
//@access Public
exports.updateJob = asyncHandler( async(req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new:true,//return updated job
      runValidators: true
  });

  if(!job){
      throw new Error('No Job like that exists')
  }

  res.status(200).json({
    status: 'success',
    data: {
      job
    }
  });

});

//@desc Update delete Job by Id
//@route DELETE /api/job/:id
//@access Public
exports.deleteJob = asyncHandler(async(req, res) => {
    const job = await Job.findByIdAndDelete(req.params.id);

    if(!job){
        throw new Error('No Job like that exists')
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
});