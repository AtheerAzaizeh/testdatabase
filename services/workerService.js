const Worker = require('../models/Worker');

class WorkerService {
  static async createWorker(data) {
    return await Worker.create(data);
  }

  static async getWorkers() {
    return await Worker.findAll();
  }

  static async getWorkerById(id) {
    return await Worker.findByPk(id);
  }

  static async updateWorker(id, data) {
    const [updated] = await Worker.update(data, { where: { WorkerID: id } });
    if (updated) {
      return await Worker.findByPk(id);
    }
    throw new Error('Worker not found');
  }

  static async deleteWorker(id) {
    const deleted = await Worker.destroy({ where: { WorkerID: id } });
    if (deleted) {
      return 'Worker deleted';
    }
    throw new Error('Worker not found');
  }
}

module.exports = WorkerService;
