const JobService = require('./jobService');
const Worker = require('../models/worker');

class RecommendationService {
  static async recommendJobsForWorker(workerId) {
    const worker = await Worker.findByPk(workerId);
    const searchQuery = worker.Skills.join(' ') + ' ' + worker.Location;
    const recommendedJobs = await JobService.searchJobs(searchQuery);
    return recommendedJobs;
  }
}

module.exports = RecommendationService;