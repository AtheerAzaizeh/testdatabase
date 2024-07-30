const Chat = require('../models/chatroom');
const { validationResult } = require('express-validator');

exports.sendMessage = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { senderId, receiverId, message } = req.body;
        const chatMessage = await Chat.create({ senderId, receiverId, message });
        res.status(201).json(chatMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getMessageHistory = async (req, res) => {
    try {
        const { userId1, userId2 } = req.params;
        const messages = await Chat.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId1, receiverId: userId2 },
                    { senderId: userId2, receiverId: userId1 }
                ]
            }
        });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
