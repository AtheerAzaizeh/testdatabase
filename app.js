require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const managerRoutes = require('./routes/managerRoutes');
const workerRoutes = require('./routes/workerRoutes');
const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/job.routes');
const chatRoutes = require('./routes/chat.routes');
const resumeRoutes = require('./routes/resumeRoutes');
const educationRoutes = require('./routes/educationRoutes');
const notificationRoutes = require('./routes/notification.routes');
const errorHandler = require('./middleware/errorhandler');
const http = require('http');
const socketIo = require('socket.io');
const { Message, syncModels } = require('./models');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/managers', managerRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/notifications', notificationRoutes);

app.use(errorHandler);

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res || {}, next);
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('sendMessage', async (message) => {
    const newMessage = await Message.create({
      ChatRoomID: message.chatRoomID,
      SenderID: message.senderID,
      MessageText: message.text
    });

    io.emit('receiveMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const startServer = async () => {
  try {
    await syncModels();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to synchronize models or start the server:', error);
  }
};

startServer();

module.exports = { app, io };