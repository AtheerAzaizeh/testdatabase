const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');
const upload = require('../middleware/fileUpload');

router.post('/education', upload.single('certificate'), educationController.createEducation);
router.get('/education/:workerId', educationController.getEducationByWorker);

module.exports = router;
