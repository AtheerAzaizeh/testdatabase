const RecommendationService = require('../services/recommendationService');

exports.recommendJobsForWorker = async (req, res) => {
  try {
    const recommendedJobs = await RecommendationService.recommendJobsForWorker(req.params.workerId);
    res.status(200).json(recommendedJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
