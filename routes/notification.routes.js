const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController');

router.post('/notifications', NotificationController.createNotification);
router.get('/notifications/:userId', NotificationController.getNotifications);
router.put('/notifications/:notificationId', NotificationController.markAsRead);

module.exports = router;
