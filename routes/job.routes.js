const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const recommendationController = require('../controllers/recommendationController');

router.post('/', jobController.createJob);
router.get('/', jobController.getAllJobs);
router.get('/search', jobController.searchJobs);
router.get('/recommend/:workerId', recommendationController.recommendJobsForWorker);

module.exports = router;
