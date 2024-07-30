const redisClient = require('../config/redis');
const Job = require('../models/job');
const { Op } = require('sequelize');
const elasticsearchClient = require('../config/elasticsearch');

class JobService {
  static async indexJob(job) {
    await elasticsearchClient.index({
      index: 'jobs',
      id: job.JobID,
      body: {
        title: job.JobTitle,
        skills: job.Skills,
        location: job.Location,
        experience: job.YearsOfExperience,
        type: job.TypeOfWork
      }
    });
  }

  static async getJobs() {
    return new Promise((resolve, reject) => {
      redisClient.get('jobs', async (err, jobs) => {
        if (err) {
          return reject(err);
        }
        if (jobs) {
          return resolve(JSON.parse(jobs));
        }
        try {
          const jobList = await Job.findAll();
          redisClient.setex('jobs', 3600, JSON.stringify(jobList));
          resolve(jobList);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
  static async searchJobs(query) {
    return new Promise((resolve, reject) => {
      redisClient.get(query, async (err, result) => {
        if (err) return reject(err);
        if (result) return resolve(JSON.parse(result));

        const { body } = await elasticsearchClient.search({
          index: 'jobs',
          body: {
            query: {
              multi_match: {
                query,
                fields: ['title', 'skills', 'location']
              }
            }
          }
        });

        redisClient.setex(query, 3600, JSON.stringify(body.hits.hits));
        resolve(body.hits.hits);
      });
    });
  }
}

module.exports = JobService;
