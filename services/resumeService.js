const Resume = require('../models/resume');

class ResumeService {
  static async createResume(data) {
    return await Resume.create(data);
  }

  static async getResumeByWorker(workerId) {
    return await Resume.findOne({ where: { WorkerID: workerId } });
  }

  static async updateResume(workerId, data) {
    const [updated] = await Resume.update(data, { where: { WorkerID: workerId } });
    if (updated) {
      return await Resume.findOne({ where: { WorkerID: workerId } });
    }
    throw new Error('Resume not found');
  }

  static async deleteResume(workerId) {
    const deleted = await Resume.destroy({ where: { WorkerID: workerId } });
    if (deleted) {
      return 'Resume deleted';
    }
    throw new Error('Resume not found');
  }
}

module.exports = ResumeService;
