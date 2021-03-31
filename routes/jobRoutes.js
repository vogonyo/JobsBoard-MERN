const express = require('express');
const jobController = require('./../controllers/jobController');
const { user } = require('../middleware/authMiddleware.js');

const router = express.Router();


router
  .route('/')
  .get(jobController.getAllJobs)
  .post(user, jobController.createJob);

router
  .route('/:id')
  .get(jobController.getJob)
  .patch(user, jobController.updateJob)
  .delete(user, jobController.deleteJob);

module.exports = router;