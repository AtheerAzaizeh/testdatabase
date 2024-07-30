const express = require('express');
const router = express.Router();
const WorkerController = require('../controllers/workerController');
const { validateWorker } = require('../middleware/validateWorker');

router.post('/workers', validateWorker, WorkerController.createWorker);
router.get('/workers', WorkerController.getWorkers);
router.get('/workers/:id', WorkerController.getWorkerById);
router.put('/workers/:id', validateWorker, WorkerController.updateWorker);
router.delete('/workers/:id', WorkerController.deleteWorker);

module.exports = router;
