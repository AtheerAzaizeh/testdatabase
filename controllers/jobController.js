const JobService = require('../services/jobService');

exports.createJob = async (req, res) => {
  try {
    const job = await JobService.createJob(req.body);
    await JobService.indexJob(job);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobService.getAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchJobs = async (req, res) => {
  try {
    const jobs = await JobService.searchJobs(req.query.q);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
