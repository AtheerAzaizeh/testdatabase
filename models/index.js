const sequelize = require('../config/database');
const Manager = require('./manager');
const Worker = require('./worker');
const Job = require('./job');
const Resume = require('./resume');
const Education = require('./education');
const Experience = require('./experience');
const InterviewRequest = require('./interviewRequest');
const ChatRoom = require('./chatRoom');
const Message = require('./message');
const User = require('./user');
const Notification = require('./noftitiction');

const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('An error occurred while synchronizing the models:', error);
  }
};

const models = {
  Manager,
  Worker,
  Job,
  Resume,
  Education,
  Experience,
  InterviewRequest,
  ChatRoom,
  Message,
  User,
  Notification
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

module.exports = { models, syncModels };