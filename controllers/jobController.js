const asyncHandler = require('../utils/asyncHandler');
const Job = require('../models/jobModel');

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
   const jobs = await Job.find();

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
exports.getJob= asyncHandler(async(req, res) => {
    const job = await Job.findById(req.params.id);

    if(!job){
        throw new Error('Invalid job')
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
exports.updateJob = asyncHandler(async(req, res) => {
  const job = Job.findByIdAndUpdate(req.params.id, req.body, {
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