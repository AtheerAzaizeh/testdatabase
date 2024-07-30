const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Route to send a new message
router.post('/send', chatController.sendMessage);

// Route to get messages between two users
router.get('/history/:userId1/:userId2', chatController.getMessageHistory);

module.exports = router;