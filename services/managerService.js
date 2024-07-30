const Manager = require('../models/Manager');

class ManagerService {
  static async createManager(data) {
    return await Manager.create(data);
  }

  static async getManagers() {
    return await Manager.findAll();
  }

  static async getManagerById(id) {
    return await Manager.findByPk(id);
  }

  static async updateManager(id, data) {
    const [updated] = await Manager.update(data, { where: { ManagerID: id } });
    if (updated) {
      return await Manager.findByPk(id);
    }
    throw new Error('Manager not found');
  }

  static async deleteManager(id) {
    const deleted = await Manager.destroy({ where: { ManagerID: id } });
    if (deleted) {
      return 'Manager deleted';
    }
    throw new Error('Manager not found');
  }
}

module.exports = ManagerService;
