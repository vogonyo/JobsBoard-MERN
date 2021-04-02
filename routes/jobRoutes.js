const express = require('express');
const jobController = require('./../controllers/jobController');
const { auth } = require('./../middleware/authMiddleware.js');

const router = express.Router();

router
  .route('/top-featured-jobs')
  .get(jobController.aliasTopJobs, jobController.getAllJobs)

router
  .route('/')
  .get(jobController.getAllJobs)
  .post(auth, jobController.createJob);

router
  .route('/:id')
  .get(jobController.getJob)
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob);

module.exports = router;