const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const upload = require('../middleware/upload');

router.post('/', upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'certificateFile', maxCount: 1 }]), resumeController.createOrUpdateResume);

module.exports = router;
