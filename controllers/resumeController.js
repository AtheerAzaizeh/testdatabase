const Resume = require('../models/resume');
const Education = require('../models/education');
const Experience = require('../models/experience');

exports.createOrUpdateResume = async (req, res) => {
    try {
        const {
            workerId, firstName, lastName, dateOfBirth, location, phoneNumber, skills,
            country, institutionName, degree, fieldOfStudy, startDate, endDate,
            companyName, jobTitle, startDateWork, endDateWork
        } = req.body;
        
        const profilePicture = req.files.profilePicture ? req.files.profilePicture[0].filename : null;
        const certificateFile = req.files.certificateFile ? req.files.certificateFile[0].filename : null;

        const resume = await Resume.findOne({ where: { WorkerID: workerId } });
        if (resume) {
            await resume.update({ firstName, lastName, dateOfBirth, location, phoneNumber, skills, profilePicture });
        } else {
            await Resume.create({ WorkerID: workerId, firstName, lastName, dateOfBirth, location, phoneNumber, skills, profilePicture });
        }

        const education = await Education.findOne({ where: { WorkerID: workerId } });
        if (education) {
            await education.update({ country, institutionName, degree, fieldOfStudy, startDate, endDate, certificateFile });
        } else {
            await Education.create({ WorkerID: workerId, country, institutionName, degree, fieldOfStudy, startDate, endDate, certificateFile });
        }

        const experience = await Experience.findOne({ where: { WorkerID: workerId } });
        if (experience) {
            await experience.update({ companyName, jobTitle, startDateWork, endDateWork });
        } else {
            await Experience.create({ WorkerID: workerId, companyName, jobTitle, startDateWork, endDateWork });
        }

        res.json({ success: true, message: 'Resume saved successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Failed to save resume' });
    }
};
