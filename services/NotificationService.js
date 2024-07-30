const Notification = require('../models/noftitiction');

class NotificationService {
  static async createNotification(data) {
    return await Notification.create(data);
  }

  static async getNotifications(userId) {
    return await Notification.findAll({ where: { UserID: userId } });
  }

  static async markAsRead(notificationId) {
    return await Notification.update({ Read: true }, { where: { NotificationID: notificationId } });
  }
}

module.exports = NotificationService;
