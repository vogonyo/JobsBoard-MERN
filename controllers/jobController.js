import asyncHandler from 'express-async-handler';
import Job from '../models/jobModel';

//@desc Create new Job 
//@route POST /api/jobs
//@access Private

exports.addJobListing = asyncHandler(async(req, res) => {
  const {
      company,
      position,
      description,
      logo,
      role,      
      contract,
      location,
      languages,
      tools
  } = req.body;

  
});

exports.getJobListings = asyncHandler(async(req, res) => {

});

exports.getJobListing = asyncHandler(async(req, res) => {

});

exports.updateJobListing = asyncHandler(async(req, res) => {

});